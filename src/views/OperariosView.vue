<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModalOperario from '@/components/CardBoxModalOperario.vue'
import FormOperario from '@/components/FormOperario.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TablaOperarios from '@/components/TablaOperarios.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { mdiAccountHardHat } from '@mdi/js'
import { ref } from 'vue'


const isModalActive = ref(false)

const nuevoOperarioModal = () => {
  isModalActive.value = true;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountHardHat" title="Operarios" main>
        <BaseButton
          target="_blank"
          :icon="mdiAccountHardHat"
          label="Nuevo Operario"
          outline
          color="info"
          rounded-full
          small
          @click="nuevoOperarioModal"
        />
      </SectionTitleLineWithButton>
      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->
      <CardBoxModalOperario
      v-model="isModalActive"
      :title="`Editar Operario`"
      has-cancel      
      >
      <!-- :client="null" -->
      <!-- v-if="selectedClient !== null" -->
        <FormOperario @cancel-modal="isModalActive=false" />
      </CardBoxModalOperario>

      <CardBox class="mb-6" has-table>
        <TablaOperarios checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style scoped></style>
