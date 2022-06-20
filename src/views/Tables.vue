<script setup>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Tables'])
</script>

<template>
  <TitleBar :title-stack="titleStack" />
  <HeroBar>Tables</HeroBar>
  <MainSection>
    <Notification
      color="info"
      :icon="mdiMonitorCellphone"
    >
      <b>Responsive table.</b> Collapses on mobile
    </Notification>

    <CardComponent
      class="mb-6"
      title="Clients"
      :icon="mdiAccountMultiple"
      has-table
    >
      <ClientsTable checkable />
    </CardComponent>

    <TitleSubBar
      :icon="mdiTableBorder"
      title="Wrapped variation"
    />

    <Notification
      color="success"
      :icon="mdiTableBorder"
    >
      <b>Tightly wrapped</b> &mdash; table header becomes card header
    </Notification>

    <CardComponent
      class="mb-6"
      has-table
    >
      <ClientsTable checkable />
    </CardComponent>

    <TitleSubBar
      :icon="mdiTableOff"
      title="Empty variation"
    />

    <Notification
      color="danger"
      :icon="mdiTableOff"
    >
      <b>Empty table.</b> When there's nothing to show
    </Notification>

    <CardComponent empty />
  </MainSection>

  <BottomOtherPagesSection />
</template>
