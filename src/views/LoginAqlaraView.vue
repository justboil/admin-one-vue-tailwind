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

const router = useRouter()
const loginStore = useLoginStore()
const plantaStore = usePlantasStore()

const isAuthenticating = ref(false)
const errorMessage = ref('')
const accessToken = ref('')

const submit = () => {
  router.push('/')
}

// Función para determinar el rol según el email (puedes modificar el criterio)
const determineRoleFromAccount = async (userEmail) => {
  const email = userEmail.toLowerCase()
  const operario = await plantaStore.getOperarios.find((operario) => operario.email === email)

  if (!operario) {
    console.log('No se encontró el operario', email)
    return null
  }

  console.log('Operario encontrado', operario)

  return operario
}

const loginWithMicrosoft = async () => {
  if (isAuthenticating.value) {
    return
  }
  isAuthenticating.value = true
  errorMessage.value = ''

  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['User.Read', 'profile', 'email']
    })

    accessToken.value = loginResponse.accessToken
    console.log('Login RESPONSE: ', loginResponse)

    // Guardar datos básicos en el store
    console.log('Login successful:', loginResponse)
    loginStore.login(loginResponse.account)
    loginStore.setIsAuthenticated(true)
    loginStore.setAccount(loginResponse.account)
    loginStore.setUser(loginResponse.account)

    // Verificar si el usuario existe en la tabla operarios
    const operario = await determineRoleFromAccount(loginResponse.account.username)

    if (!operario) {
      // Usuario no existe en la tabla operarios
      console.log('Usuario no autorizado: no existe en tabla operarios')
      router.push('/unauthorized')
    } else {
      // Usuario existe en la tabla operarios
      console.log('Usuario autorizado con rol:', operario.type)
      loginStore.setUserRole(operario.type)
      loginStore.setUserId(operario.id)
      router.push('/mapa')
    }
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
