<script setup>

import { ref, defineProps, defineEmits, computed } from 'vue';
import modalContent from '@/modalTechnicalContents.js'

const props = defineProps({ modalIsVisible: Boolean, modalButtonName: String })

const modalDataToDisplay = computed(() => {
    for(let thing of modalContent){
        if (thing.name === props.modalButtonName){
            return {body: thing.content, title: thing.title}
        }
    }
})

const modalNotVisibleClass = "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
const modalVisibleClass = "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"

const emit = defineEmits(["showModal"])

function closeModalClick(){
    emit("showModal")
    console.log(modalDataToDisplay.value)
}

</script>


<template>
  <!-- Main modal -->
  <div 
      id="default-modal"
      data-modal-placement="center-center"
      tabindex="-1"
      aria-hidden="true" 
      :class="props.modalIsVisible ? modalVisibleClass : modalNotVisibleClass">
      
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      {{ modalDataToDisplay?.title }}
                  </h3>
                  <button @click="closeModalClick" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      <div v-html="modalDataToDisplay?.body"></div>
                  </p>
                  
              </div>
              <!-- Modal footer -->

          </div>
      </div>
  </div>
</template>