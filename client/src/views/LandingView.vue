<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleProjectes from '@/components/TableSampleProjectes.vue'
import ModalForTechnicalNotes from '@/components/ModalForTechnicalNotes.vue'

const route = useRoute();

const modalIsVisible = ref(false)
const modalButtonName = ref("")

function showModal(event){
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
    
   
    <SectionMain class="h-fit">
      <ModalForTechnicalNotes :modal-is-visible="modalIsVisible" :modal-button-name="modalButtonName" @show-modal="showModal"/>
      <h3 class="text-center">{{ route.params.asideMenuCategoria.toUpperCase() }} LANDING VIEW</h3>
      <CardBox class="h-1/3"><br><br><br>Llista resum amb els 3-5 items creats o modificats més recentment.<br><br><br>
        <button name="landing_list" 
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                @click="showModal" >Technical Notes
        </button>
      </CardBox>

      <div class="grid grid-cols-2 gap-4 h-1/3">

        <CardBox><br><br><br>Temes pendents.<br><br><br></CardBox>
        <CardBox><br><br><br>Calendari/Timeline.<br><br><br></CardBox>

      </div>

      <div class="grid grid-cols-2 gap-4 h-1/3">

<CardBox><br><br><br>Llista resum amb els 3-5 items tancats més recentment.<br><br><br></CardBox>
<CardBox><br><br><br>Log d' activitat de usuaries.<br><br><br></CardBox>

</div>


    </SectionMain>


  </LayoutAuthenticated>
</template>
