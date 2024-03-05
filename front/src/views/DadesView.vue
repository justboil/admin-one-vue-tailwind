<script setup>

import { ref, onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import CardBox from '@/components/CardBox.vue'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import ModalForTechnicalNotes from '@/components/ModalForTechnicalNotes.vue'

const chartData = ref(null)
const modalIsVisible = ref(false)
const modalButtonName = ref("")

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

function showModal(event){

  // this function recieves an EMIT from the child Modal. If the click comes from the CLOSE button in the modal,
  // the event is not read (we don't need to read the event.target.name if we're closing the modal, it's only
  // used to set the modalContent value.)
  if(event){
    modalButtonName.value = event.target.name
  }
  
  console.log(modalButtonName.value)
  modalIsVisible.value = !modalIsVisible.value
  console.log(modalIsVisible.value)
}

</script>

<template>
  <LayoutAuthenticated>
    <ModalForTechnicalNotes :modal-is-visible="modalIsVisible" :modal-button-name="modalButtonName" @show-modal="showModal"/>
      <SectionMain class="h-fit">
        
        <h3 class="text-center">VISUALITZACIÓ DE DADES</h3>
        
      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
    
        <button name="global_graph" 
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                @click="showModal" >Technical Notes
        </button>
      </CardBox>

        <div class="grid grid-cols-2 gap-4 h-1/3">

          <CardBox>
            <br><br><br>Widget amb desglós ingressos.<br><br><br>
            
            <button name="global_earnings" 
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              @click="showModal" >Technical Notes
            </button>
          </CardBox>
          
          <CardBox>
            <br><br><br>Widget amb desglós despeses.<br><br><br>
            <button name="global_expenses"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              @click="showModal" >Technical Notes</button>
          </CardBox>
          

        </div>

        <div class="grid grid-cols-3 gap-4 h-1/3">

  <CardBox>
    <br><br><br>Widget amb dada X del mes actual.<br><br><br>
    <button name="global_extrawidget_left"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="showModal" >Technical Notes</button>
  </CardBox>
  
  <CardBox>
    <br><br><br>Widget amb dada Y del mes actual.<br><br><br>
    <button name="global_extrawidget_center"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="showModal" >Technical Notes</button>  
  </CardBox>
  <CardBox>
    <br><br><br>Widget amb dada Z del mes actual.<br><br><br>
    <button name="global_extrawidget_right"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="showModal" >Technical Notes</button>
  </CardBox>

  </div>


      </SectionMain>


  </LayoutAuthenticated>
</template>
