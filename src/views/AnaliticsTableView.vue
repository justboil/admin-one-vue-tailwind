<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiFlaskEmptyOutline, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
// import NotificationBar from '@/components/NotificationBar.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
// import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import AnaliticsTable from '@/components/AnaliticsTable.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFlaskEmptyOutline" title="Analíticas" main>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

      <CardBox class="mb-6" has-table>
        <AnaliticsTable checkable />
      </CardBox>

      <!-- <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" /> -->

      <!-- <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar> -->

      <!-- <CardBox>
        <CardBoxComponentEmpty />
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
