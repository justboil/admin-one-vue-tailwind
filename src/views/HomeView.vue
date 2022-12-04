<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "/src/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie
} from "@mdi/js";
import * as chartConfig from "/src/components/Charts/chart.config.js";
import LineChart from "/src/components/Charts/LineChart.vue";
import SectionMain from "/src/components/SectionMain.vue";
import CardBoxWidget from "/src/components/CardBoxWidget.vue";
import CardBox from "/src/components/CardBox.vue";
import TableSampleClients from "/src/components/TableSampleClients.vue";
import NotificationBar from "/src/components/NotificationBar.vue";
import BaseButton from "/src/components/BaseButton.vue";
import CardBoxTransaction from "/src/components/CardBoxTransaction.vue";
import CardBoxClient from "/src/components/CardBoxClient.vue";
import LayoutAuthenticated from "/src/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "/src/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "/src/components/SectionBannerStarOnGitHub.vue";
import { useUserStore } from "../stores/user";
import BaseDivider from "/src/components/BaseDivider.vue";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const mainStore = useMainStore();
const userStore = useUserStore();
const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox :class="cardClass">
        <BaseButton label="프로필" to="/profile"></BaseButton>
      </CardBox>
      <BaseDivider/>
      <CardBox :class="cardClass">
        <BaseButton label="스터디 관리" to="/studygroup"></BaseButton>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
