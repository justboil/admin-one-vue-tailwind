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

const loginStore = useLoginStore()

const isAuthenticating = ref(false)
const errorMessage = ref('')

const router = useRouter()

const submit = () => {
  router.push('/')
}

const loginWithMicrosoft = async () => {
  if (isAuthenticating.value) {
    return
  }
  isAuthenticating.value = true
  errorMessage.value = ''

  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['user.read']
    })

    // // Intercambiar AccessToken por un JWT propio en tu backend
    // const backendResponse = await fetch('https://tu-backend.com/api/auth/microsoft', {
    //   method: 'POST',
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
