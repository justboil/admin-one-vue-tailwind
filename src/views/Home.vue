<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <notification color="info" :icon="mdiGithub" class="shadow-xl">
      Please star this project on
      <a href="https://github.com/justboil/admin-one-vue-tailwind" class="underline" target="_blank">GitHub</a>
      <template #right>
        <jb-button
          href="https://github.com/justboil/admin-one-vue-tailwind"
          :icon="mdiGithub"
          label="GitHub"
          target="_blank"
          small
        />
      </template>
    </notification>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="512"
        label="Clients"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiCartOutline"
        :number="7770"
        prefix="$"
        label="Sales"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="256"
        suffix="%"
        label="Performance"
      />
    </div>

    <card-component
      title="Performance"
      :icon="mdiFinance"
      :header-icon="mdiReload"
      class="mb-6"
      @header-icon-click="fillChartData"
    >
      <div v-if="chartData">
        <line-chart :data="chartData" class="h-96"/>
      </div>
    </card-component>

    <notification color="info" :icon="mdiMonitorCellphone">
      <b>Responsive table.</b> Collapses on mobile
    </notification>

    <card-component :icon="mdiMonitorCellphone" title="Responsive table" has-table>
      <clients-table />
    </card-component>
  </main-section>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from 'vue'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config'
import LineChart from '@/components/Charts/LineChart'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTable from '@/components/ClientsTable'
import Notification from '@/components/Notification'
import JbButton from '@/components/JbButton'

export default {
  name: 'Home',
  components: {
    MainSection,
    ClientsTable,
    LineChart,
    CardComponent,
    CardWidget,
    HeroBar,
    TitleBar,
    Notification,
    JbButton
  },
  setup () {
    const titleStack = ref(['Admin', 'Dashboard'])

    const chartData = ref(null)

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData()
    }

    onMounted(() => {
      fillChartData()
    })

    return {
      titleStack,
      chartData,
      fillChartData,
      mdiAccountMultiple,
      mdiCartOutline,
      mdiChartTimelineVariant,
      mdiFinance,
      mdiMonitorCellphone,
      mdiReload,
      mdiGithub
    }
  }
}
</script>
