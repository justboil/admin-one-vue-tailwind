<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleProjectes from '@/components/TableSampleProjectes.vue'

const route = useRoute();

</script>

<template>
  <LayoutAuthenticated>
    
    <SectionMain class="h-fit">

      <h3 class="text-center">{{ route.params.asideMenuCategoria.toUpperCase() }} LANDING VIEW</h3>
      <CardBox class="h-1/3"><br><br><br>Llista resum amb els 3-5 items creats o modificats més recentment.<br><br><br></CardBox>

      <div class="grid grid-cols-2 gap-4 h-1/3">

        <CardBox><br><br><br>Temes pendents.<br><br><br></CardBox>
        <CardBox><br><br><br>Calendari/Timeline.<br><br><br></CardBox>

      </div>

      <div class="grid grid-cols-2 gap-4 h-1/3">

<CardBox><br><br><br>Llista resum amb els 3-5 items tancats més recentment.<br><br><br></CardBox>
<CardBox><br><br><br>Log d' activitat de usuaries.<br><br><br></CardBox>

</div>


    </SectionMain>


  </LayoutAuthenticated>
</template>
