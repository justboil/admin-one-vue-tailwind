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
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tables</hero-bar>
  <main-section>
    <notification
      color="info"
      :icon="mdiMonitorCellphone"
    >
      <b>Responsive table.</b> Collapses on mobile
    </notification>

    <card-component
      class="mb-6"
      title="Clients"
      :icon="mdiAccountMultiple"
      has-table
    >
      <clients-table checkable />
    </card-component>

    <title-sub-bar
      :icon="mdiTableBorder"
      title="Wrapped variation"
    />

    <notification
      color="success"
      :icon="mdiTableBorder"
    >
      <b>Tightly wrapped</b> &mdash; table header becomes card header
    </notification>

    <card-component
      class="mb-6"
      has-table
    >
      <clients-table checkable />
    </card-component>

    <title-sub-bar
      :icon="mdiTableOff"
      title="Empty variation"
    />

    <notification
      color="danger"
      :icon="mdiTableOff"
    >
      <b>Empty table.</b> When there's nothing to show
    </notification>

    <card-component empty />
  </main-section>

  <bottom-other-pages-section />
</template>
