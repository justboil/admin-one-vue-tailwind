<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiMicrosoftWindows } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import msalInstance from '@/services/msalConfig'
import useLoginStore from '@/stores/login'
import AqlaraLogo from '@/components/AqlaraLogo.vue'
import  { supabase } from '@/services/supabase'

const loginStore = useLoginStore()

const isAuthenticating = ref(false)
const errorMessage = ref('')

const router = useRouter()

const isLoading = ref(false)

const submit = () => {
  router.push('/')
}

const loginWithMicrosoft = async () => {
  try {
    //1.Iniciar estado de carga
    isLoading.value = true
    errorMessage.value = ''

    //2. Configurar opciones de login

    const msalOptions = {
      scopes: ['user.read', 'offline_access'],
      prompt: 'select_account'
    }

    //3. Intentar login con Microsoft
    const msResponse = await msalInstance.loginPopup(msalOptions)

    //4. Validar respuesta de Microsoft
    if (!msResponse || !msResponse.account) {
      throw new Error('Login Incompleto: No se recibió respuesta válida de Microsoft')
    }
    //5. Obtener Tokens 
    const tokenData = {
      accessToken: msResponse.accessToken,
      refreshToken: msResponse.account.refreshToken,
      expiresAt: new Date().getTime() + msResponse.expiresOn * 1000
    }

    //6. Sincronizar con Supabase
    await syncWithSupabase(msResponse.account, tokenData)

    //7. Iniciar sesion en el store
    await loginStore.login({ user: msResponse.account, tokens: tokenData })

  } catch (error) {
    handleLoginError(error)
  } finally {
    isLoading.value = false
  }
}

const handleLoginError = (error) => {
  console.error('Error durante el login:', error)
  errorMessage.value = error.message || 'Error desconocido durante el login'
}

  const syncWithSupabase = async (msUser, tokenData) => {
  try {
    // 1. Buscar usuario existente
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', msUser.email)
      .single()

    if (existingUser) {
      // 2a. Actualizar usuario existente
      await supabase.from('users').update({
        name: msUser.name,
        last_login: new Date()
      }).eq('id', existingUser.id)

    } else {
      // 2b. Crear nuevo usuario
      const { data: newUser } = await supabase.from('users').insert({
        email: msUser.email,
        name: msUser.name,
        role_id: await determineInitialRole(msUser)
      }).select().single()
    }

    // 3. Registrar sesión
    await supabase.from('user_sessions').insert({
      user_id: existingUser?.id,
      ms_access_token: tokenData.accessToken,
      ms_refresh_token: tokenData.refreshToken,
      expires_at: new Date(tokenData.expiresAt)
    })

    // 4. Registrar intento exitoso
    await logLoginAttempt({
      email: msUser.email,
      success: true
    })

  } catch (error) {
    console.error('Error sincronizando con Supabase:', error)
    throw error
  }
}




onMounted(() => {
  msalInstance
    .initialize()
    .then(() => {
      console.log('MSAL initialized')
    })
    .catch((error) => {
      console.error('MSAL initialization failed:', error)
    })
})
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="blueDarkSoft">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <!-- <img src="" alt="Aqlara" class="w-32 mx-auto" /> -->
        <div class="flex justify-center">
          <AqlaraLogo />
        </div>

        <template #footer>
          <BaseButtons class="flex justify-center gap-4">
            <BaseButton
              :disabled="isAuthenticating"
              type="submit"
              :icon="mdiMicrosoftWindows"
              color="info"
              label="Login with Microsoft"
              @click="loginWithMicrosoft"
            />
            <!-- <BaseButton label="Login with Factorial HR" :icon="mdiAccount" color="danger" @click="loginWithFactorial"  /> -->
          </BaseButtons>

          <div v-if="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </div>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
