<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const form = reactive({
  login: 'admin',
  pass: 'admin',
  remember: ['remember']
})

const router = useRouter()

const submit = () => {
  AuthService.login({username:form.login,password:form.pass}).then(() => {
    router.push("/dashboard")
  })
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen
      v-slot="{ cardClass }"
      bg="login"
    >
      <CardBox
        :class="cardClass"
        form
        title="ยินดีต้อนรับ"
        header-icon=""
        @submit.prevent="submit"
      >
        <FormField
          label="ชื่อผู้ใช้"
          help="กรุณากรอกชื่อผู้ใช้"
        >
          <FormControl
            v-model="form.login"
            icon="account"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField
          label="รหัสผ่าน"
          help="กรุณากรอกรหัสผ่าน"
        >
          <FormControl
            v-model="form.pass"
            icon="asterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadioPicker
          v-model="form.remember"
          name="remember"
          :options="{ remember: 'จดจำการเข้าใช้งาน' }"
        />

        <BaseDivider />

        <BaseButtons
          type="justify-center"
        >
          <BaseButton
            type="submit"
            color="info"
            label="เข้าสู่ระบบ"
          />
          <!-- <BaseButton
            to="/dashboard"
            color="info"
            outline
            label="Back"
          /> -->
        </BaseButtons>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
