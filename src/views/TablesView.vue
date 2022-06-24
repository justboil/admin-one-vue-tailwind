<script setup>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'

const titleStack = ref(['Admin', 'Tables'])
</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Tables</SectionHeroBar>
  <SectionMain>
    <NotificationBar
      color="info"
      :icon="mdiMonitorCellphone"
    >
      <b>Responsive table.</b> Collapses on mobile
    </NotificationBar>

    <CardBox
      class="mb-6"
      title="Clients"
      :icon="mdiAccountMultiple"
      has-table
    >
      <TableSampleClients checkable />
    </CardBox>

    <SectionTitleBarSub
      :icon="mdiTableBorder"
      title="Wrapped variation"
    />

    <NotificationBar
      color="success"
      :icon="mdiTableBorder"
    >
      <b>Tightly wrapped</b> &mdash; table header becomes card header
    </NotificationBar>

    <CardBox
      class="mb-6"
      has-table
    >
      <TableSampleClients checkable />
    </CardBox>

    <SectionTitleBarSub
      :icon="mdiTableOff"
      title="Empty variation"
    />

    <NotificationBar
      color="danger"
      :icon="mdiTableOff"
    >
      <b>Empty table.</b> When there's nothing to show
    </NotificationBar>

    <CardBox empty />
  </SectionMain>

  <SectionBottomOtherPages />
</template>
