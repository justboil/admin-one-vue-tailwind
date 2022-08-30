<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleBarSub
        icon="cashRegister"
        title="สรุปยอด"
      />
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          :trend="dashboard?.countSendToday"
          color="text-teal-500"
          trend-type="up"
          icon="cashPlus"
          :number="dashboard?.sumSendToday"
          label="ยอดส่งวันนี้ทั้งหมด"
        />
        <CardBoxWidget
          :trend="dashboard?.countReceiveToday"
          color="text-rose-500"
          trend-type="down"
          icon="cashMinus"
          :number="dashboard?.sumReceiveToday"
          label="ยอดรับวันนี้ทั้งหมด"
        />
        <CardBoxWidget
          :trend="dashboard?.countDebt"
          trend-type="alert"
          color="text-amber-500"
          icon="cashLock"
          :number="dashboard?.sumDebt"
          label="ยอดค้างจ่ายทั้งหมด"
        />
        
      </div>

      <SectionTitleBarSub
        icon="homeRoof"
        title="ภาพรวมวงแชร์"
      />
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 ">
        <CardBoxWidget
          color="text-blue-600"
          icon="homeClockOutline"
          :number="dashboard?.countGroupToday"
          label="วงแชร์วันนี้"
        />
        <CardBoxWidget
          color="text-teal-500"
          icon="homeLightbulbOutline"
          :number="dashboard?.countGroupPlaying"
          label="วงแชร์กำลังเล่น"
        />
        <CardBoxWidget
          color="text-amber-500"
          icon="homeAlertOutline"
          :number="dashboard?.countGroupExpired"
          label="วงแชร์ที่เกินวันที่จบวงแล้ว"
        />
        <CardBoxWidget
          color="text-rose-500"
          icon="homeRemoveOutline"
          :number="dashboard?.countGroupFinish"
          label="วงแชร์จบแล้ว"
        />

      </div>

      <div class="mb-6">
        <SectionTitleBarSub
          icon="listBoxOutline"
          title="รายการวงแชร์วันนี้"
        />
          <TableGroupsToday :items="dashboard?.groupsToday"/>
      </div>

      <SectionTitleBarSub
        icon="accountOutline"
        title="ภาพรวมลูกแชร์"
      />
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 ">
        <div class="col-span-2 ">
          <CardBoxClient
            type="danger"
            :name="dashboard?.sumDebtMax ? dashboard?.sumDebtMax.memberName : ''"
            subText="ลูกแชร์ที่มียอดค้างมากที่สุด"
            :amt="dashboard?.sumDebtMax ? dashboard?.sumDebtMax.sumDebt : 0"
          />
        </div>
        <CardBoxWidget
          color="text-blue-600"
          icon="accountMultipleOutline"
          :number="dashboard?.countMember"
          label="ลูกแชร์ทั้งหมด"
        />
        <CardBoxWidget
          color="text-teal-500"
          icon="accountMultipleCheckOutline"
          :number="dashboard?.countMemberEmpty"
          label="ลูกแชร์ที่ว่าง"
        />
        
      </div>



      

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction,index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        
      </div>

      <SectionTitleBarSub
        icon="chartLine"
        title="ภาพรวม มือเป็น-มือตาย"
      />

      <CardBox
        title="แสดงยอดมือเป็น-มือตายของแต่ล่ะเดือน"
        icon=""
        class="mb-6"
        header-icon=""
      >
        <div v-if="chartData">
          <line-chart
            :data="chartData"
            class="h-96"
          />
        </div>
      </CardBox>

     
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script >
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableGroupsToday from '@/components/TableGroupsToday.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'

import DashboardService from '@/services/dashboard'

export default {
  data(){
    return {
      titleStack : ['ภามรวมบ้านแชร์'],
      chartData : null,
      chartColors : {primary: '#00D1B2',danger: '#FF3860'},
      dashboard : null
    }
  },
  components : {
    LineChart,
    SectionMain,
    SectionTitleBar,
    SectionHeroBar,
    CardBoxWidget,
    CardBox,
    TableGroupsToday,
    NotificationBar,
    BaseButton,
    CardBoxTransaction,
    CardBoxClient,
    SectionTitleBarSub,
    LayoutAuthenticated,
  },
  created(){
    this.getDashboard()
  },
  methods : {
    async getDashboard(){
      let loader = this.$loading.show();
      const resp = await DashboardService.getDashboard();
      if(resp){
        this.dashboard = resp.data
        this.chartData = this.createChart()
        loader.hide()
      }
    },
    getChartData(type){
      const datas = []
      this.dashboard.summaries.map((summary) => {
        if(type === 'inc'){
          datas.push(summary.amount)
        }
        if(type === 'exp'){
          datas.push(summary.paid)
        }
      })
      return datas;
    },
    getDatasetObject(color,type){
      return {
        fill: true,
        borderColor: this.chartColors[color],
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: this.chartColors[color],
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: this.chartColors[color],
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: this.getChartData(type),
        tension: 0.5,
        cubicInterpolationMode: 'default'
      }
    },
    createChart(){
      const labels = []

      this.dashboard.summaries.map((summary) => {
        labels.push(`${summary.month}`)
      })

      return {
        labels,
        datasets: [
          this.getDatasetObject('primary', 'exp'),
          this.getDatasetObject('danger', 'inc')
        ]
      }
    }
  }
}
</script>


