<template>
  <CardBox rounded="">
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-6 w-24" :username="$route.params.id"/>
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          <b>{{ user.name }}</b>
        </h1>
        <div class="flex justify-center md:block">
          <PillTag
            text="Verified"
            type="info"
            icon="checkDecagram"
          />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>

<script>
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import PillTag from '@/components/PillTag.vue'
import MemberService from '@/services/member'

export default {
  data() {
    return {
      userSwitchVal : [],
      user : {}
    }
  },
  created(){
    this.getMember()
  },  
  methods : {
    async getMember(){
      const resp = await MemberService.get(this.$route.params.id);
      if(resp.data){
          this.user = resp.data.data
      }
    }
  },
  components : {
    BaseLevel,
    UserAvatarCurrentUser,
    CardBox,
    FormCheckRadioPicker,
    PillTag
  }
}
</script>


