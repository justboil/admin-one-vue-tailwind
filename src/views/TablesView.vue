<script setup>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableGroupsToday from '@/components/TableGroupsToday.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import SectionBottomOtherPages from '@/components/SectionBottomOtherPages.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

const titleStack = ref(['Admin', 'Tables'])
</script>

<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionHeroBar>Tables</SectionHeroBar>
    <SectionMain>
      <NotificationBar
        color="info"
        icon="monitorCellphone"
      >
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox
        class="mb-6"
        title="Clients"
        icon="accountMultiple"
        has-table
      >
        <TableGroupsToday checkable />
      </CardBox>

      <SectionTitleBarSub
        icon="tableBorder"
        title="Wrapped variation"
      />

      <NotificationBar
        color="success"
        icon="tableBorder"
      >
        <b>Tightly wrapped</b> &mdash; table header becomes card header
      </NotificationBar>

      <CardBox
        class="mb-6"
        has-table
      >
        <TableGroupsToday checkable />
      </CardBox>

      <SectionTitleBarSub
        icon="tableOff"
        title="Empty variation"
      />

      <NotificationBar
        color="danger"
        icon="tableOff"
      >
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar>

      <CardBox empty />
    </SectionMain>

    <SectionBottomOtherPages />
  </LayoutAuthenticated>
</template>
