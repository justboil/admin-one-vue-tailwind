<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import msalInstance from '@/services/msalConfig'
import useLoginStore from '@/stores/login'
import { FACTORIAL_CLIENT_ID, FACTORIAL_REDIRECT_URI, FACTORIAL_AUTH_URL, FACTORIAL_TOKEN_URL } from '@/services/factorialConfig';

const loginStore = useLoginStore()


const form = reactive({
  login: 'john.doe',
  pass: 'highly-secure-password-fYjUw-',
  remember: true
})

const router = useRouter()

const submit = () => {
  router.push('/')
}

const loginWithMicrosoft = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['user.read'],
    });
    console.log('Login successful:', loginResponse);
    loginStore.setIsAuthenticated(true);
    loginStore.setAccount(loginResponse.account);
    loginStore.setUser(loginResponse.account);
    router.push('/');
    
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const loginWithFactorial = () => {
  const authUrl = `${FACTORIAL_AUTH_URL}?response_type=code&client_id=${FACTORIAL_CLIENT_ID}&redirect_uri=${encodeURIComponent(FACTORIAL_REDIRECT_URI)}`;
  window.location.href = authUrl;
};

const handleFactorialCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    try {
      const response = await fetch(FACTORIAL_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: FACTORIAL_REDIRECT_URI,
          client_id: FACTORIAL_CLIENT_ID,
          client_secret: FACTORIAL_CLIENT_SECRET,
        }),
      });
      const data = await response.json();
      console.log('Factorial login successful:', data);
      loginStore.setIsAuthenticated(true);
      loginStore.setAccount(data);
      router.push('/');
    } catch (error) {
      console.error('Factorial login failed:', error);
    }
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
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton label="Login with Microsoft" @click="loginWithMicrosoft" />
            <BaseButton label="Login with Factorial RH" @click="loginWithFactorial"  />
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
