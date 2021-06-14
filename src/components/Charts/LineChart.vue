<script>
import { Line } from 'vue3-chart-v2'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  },
  watch: {
    chartData () {
      this.state.chartObj.destroy()
      this.renderChart(this.chartData, this.chartOptions)
    }
  }
}
</script>
