<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleProjectes from '@/components/TableSampleProjectes.vue'
</script>

<template>
  <LayoutAuthenticated>
    
    <SectionMain>

      <SectionTitle>BALANÇ SOCIAL VIEW</SectionTitle>

    </SectionMain>
  </LayoutAuthenticated>
</template>
