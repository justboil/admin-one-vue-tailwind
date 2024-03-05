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
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Projectes" main>
        
      </SectionTitleLineWithButton>
      <TableSampleProjectes checkable />
    </SectionMain>

    <SectionTitle>Custom elements</SectionTitle>
    <CardBox class="mb-6" has-table>
       
      </CardBox>
    <SectionMain>

      <SectionTitle>The user Id in the frontend nooooo: {{ route.params.asideMenuCategoria }}</SectionTitle>

    </SectionMain>
  </LayoutAuthenticated>
</template>
