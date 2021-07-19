<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tables</hero-bar>
  <main-section>
    <notification color="info" :icon="mdiMonitorCellphone">
      <b>Responsive table.</b> Collapses on mobile
    </notification>

    <card-component title="Clients" :icon="mdiAccountMultiple" has-table>
      <clients-table checkable/>
    </card-component>

    <notification color="success" :icon="mdiTableBorder">
      <b>Tightly wrapped</b> &mdash; table header becomes card header
    </notification>

    <card-component has-table>
      <clients-table checkable/>
    </card-component>

    <notification color="danger" :icon="mdiTableOff">
      <b>Empty table.</b> When there's nothing to show
    </notification>

    <card-component empty/>
  </main-section>

  <bottom-other-pages-section />
</template>

<script>
import { ref } from 'vue'
import { mdiMonitorCellphone, mdiAccountMultiple, mdiTableBorder, mdiTableOff } from '@mdi/js'
import MainSection from '@/components/MainSection'
import Notification from '@/components/Notification'
import ClientsTable from '@/components/ClientsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection'

export default {
  name: 'Tables',
  components: {
    MainSection,
    HeroBar,
    TitleBar,
    CardComponent,
    ClientsTable,
    Notification,
    BottomOtherPagesSection
  },
  setup () {
    const titleStack = ref(['Admin', 'Tables'])

    return {
      titleStack,
      mdiMonitorCellphone,
      mdiAccountMultiple,
      mdiTableBorder,
      mdiTableOff
    }
  }
}
</script>
