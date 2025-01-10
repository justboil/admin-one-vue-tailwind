<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiMicrosoftWindows } from '@mdi/js'
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
      scopes: ['user.read'],
    });
    console.log('Login successful:', loginResponse);
    loginStore.login(loginResponse.account);
    loginStore.setIsAuthenticated(true);
    loginStore.setAccount(loginResponse.account);
    loginStore.setUser(loginResponse.account);
    router.push('/');
    
  } catch (error) {
    console.error('Login failed:', error);
    errorMessage.value = `LOGIN FAILED ${error.message}`
  } finally {
    isAuthenticating.value = false
  }
};




onMounted(() => {
  msalInstance.initialize().then(() => {
    console.log('MSAL initialized');
  }).catch((error) => {

    console.error('MSAL initialization failed:', error);
  });
});
</script>

<template>
  <LayoutGuest >
    <SectionFullScreen v-slot="{ cardClass }" bg="blueDarkSoft">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">

        <!-- <img src="" alt="Aqlara" class="w-32 mx-auto" /> -->
         <div class="flex justify-center">
            <AqlaraLogo />

          </div>

        <template #footer>
          <BaseButtons class="flex  justify-center gap-4">
            <BaseButton :disabled="isAuthenticating" :icon="mdiMicrosoftWindows" color="info" label="Login with Microsoft" @click="loginWithMicrosoft" />
            <!-- <BaseButton label="Login with Factorial HR" :icon="mdiAccount" color="danger" @click="loginWithFactorial"  /> -->
            <!-- <BaseButton disabled type="submit" color="info" label="Login" /> -->
            <!-- <BaseButton to="/dashboard" color="info" outline label="Back" /> -->
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
