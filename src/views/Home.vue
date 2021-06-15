<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    Dashboard
    <template #right>
      <router-link to="/" class="button light">
        Button
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <tiles>
      <card-widget
        class="tile"
        color="text-green-500"
        icon="account-multiple"
        :number="512"
        label="Clients"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        icon="cart-outline"
        :number="7770"
        prefix="$"
        label="Sales"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        icon="chart-timeline-variant"
        :number="256"
        suffix="%"
        label="Performance"
      />
    </tiles>

    <card-component
      title="Performance"
      icon="finance"
      header-icon="reload"
      class="mb-6"
      @header-icon-click="fillChartData"
    >
      <div v-if="chartData" class="chart-area">
        <line-chart
          ref="bigChart"
          :chart-data="chartData"
          :chart-options="chartOptions"
        >
        </line-chart>
      </div>
    </card-component>

    <card-component title="Clients" :has-table="true">
      <clients-table />
    </card-component>
  </main-section>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from 'vue'
import * as chartConfig from '@/components/Charts/chart.config'
import LineChart from '@/components/Charts/LineChart'
import MainSection from '@/components/MainSection'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTable from '@/components/ClientsTable'

export default {
  name: 'Home',
  components: {
    MainSection,
    ClientsTable,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  setup () {
    const titleStack = ref(['Admin', 'Dashboard'])

    const chartOptions = chartConfig.chartOptions

    const chartData = ref(null)

    const fillChartData = () => {
      chartData.value = chartConfig.sampleChartData()
    }

    onMounted(() => {
      fillChartData()
    })

    return {
      titleStack,
      chartOptions,
      chartData,
      fillChartData
    }
  }
}
</script>
