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
import { usePlantasStore } from '@/stores/plantas'
import { supabase } from '@/services/supabase'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const loginStore = useLoginStore()
const plantaStore= usePlantasStore()


const isAuthenticating = ref(false)
const errorMessage = ref('')
const accessToken = ref('')

const { user, loading, error, signInWithMicrosoft, signOut } = useAuth()

console.log(user, loading, error, signInWithMicrosoft, signOut);




const submit = () => {
  router.push('/')
}

// Función para determinar el rol según el email (puedes modificar el criterio)
const determineRoleFromAccount = async (userEmail) => {
  const email = userEmail.toLowerCase()
  // Por ejemplo, si el email termina en "@admin.com", asigna rol 'admin'
  const rolOperario = await plantaStore.getOperarios.find((operario => operario.email === email))?.type
  loginStore.setUserRole(rolOperario)
  console.log('rolOperario', rolOperario);
}

const loginWithMicrosoft = async () => {
  if (isAuthenticating.value) {
    return
  }
  isAuthenticating.value = true
  errorMessage.value = ''

  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes:['User.Read', 'profile', 'email']
    })

    accessToken.value = loginResponse.accessToken
    console.log('Login RESPONSE: ', loginResponse);

    // 2. Intercambiar token de Microsoft por token de Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
      options: {
          scopes:'email',
        },
        // token: loginResponse.idToken,
      })
    // const { data, error } = await supabase.auth.signInWithIdToken({
    //     provider: 'azure',
    //     token: loginResponse.idToken,
    //   })

    if (error) throw error

    console.log('DATA: ', data);
    // console.log('Login RESPONSE: ', accessToken.value);

    // // Intercambiar AccessToken por un JWT propio en tu backend
    // const backendResponse = await fetch('https://tu-backend.com/api/auth/microsoft', {
    //   method: 'POST',https://tecvasa-my.sharepoint.com/:x:/g/personal/mariajose_munoz_aqlara_com/EeShNP-R2otIg69ZtB64EhQBGST8wryZfmspqYD9yI6KWA?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1739530551932&web=1
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ microsoftAccessToken: loginResponse.accessToken })
    // }).then((res) => res.json())

    // if (!backendResponse.token) {
    //   throw new Error('No se recibió token válido')
    // }

    // // Guardar JWT en localStorage
    // localStorage.setItem('jwt', backendResponse.token)

    // Guardar datos básicos en el store
    console.log('Login successful:', loginResponse)
    loginStore.login(loginResponse.account)
    loginStore.setIsAuthenticated(true)
    loginStore.setAccount(loginResponse.account)
    loginStore.setUser(loginResponse.account)
    // loginStore.setRole(loginStore.userEmail)
    // console.log('loginResponse Username: ', loginResponse.account.username);

    // Determinar y guardar el rol del usuario
    const userRole = determineRoleFromAccount(loginResponse.account.username)
    loginStore.setUserRole(userRole)
    
    // await getProfilePhoto()
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = `LOGIN FAILED ${error.message}`

    if (error.name === 'BrowserAuthError' && error.message.includes('interaction_in_progress')) {
      // Intentar limpiar el estado de interacción pendiente
      msalInstance.handleRedirectPromise().then(() => {
        errorMessage.value = 'Sesión en progreso, por favor intente nuevamente'
      })
    } else {
      errorMessage.value = 'Error al iniciar sesión con Microsoft'
    }
  } finally {
    isAuthenticating.value = false
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
