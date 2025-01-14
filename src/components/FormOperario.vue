<script setup>
import { computed, reactive, ref, toValue, watch } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
// import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import { usePlantasStore } from '@/stores/plantas'
import { searchZonasOperarios } from '@/services/supabase'

// const zonasUoOperario = ref([]);

const plantasStore = usePlantasStore()

const props = defineProps({
  client: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
console.log('client: ', props.client)

const form = reactive({
  name: props.client?.name || 'Nombre',
  surname: props.client?.surname || 'Apellidos',
  email: props.client?.email || 'email@example.com',
  phone: props.client?.phone,
  id_zona: props.client?.id_zona,
  ud_operativa_fk: props.client?.ud_operativa_fk,
  type: props.client?.type || 'operario',
  id:'',
  zonas:[],
  color: '',
  olor: [],
  sabor: '',
  tipo: '',
  prueba: '5'
})

console.log('form: ', form)

const returnTipoOperario = (tipoId) => {
  return plantasStore.getTipoPersonal.find((tipo) => tipo.id === tipoId)
  
}

watch(
  () => props.client,
  (newClient) => {
    form.name = newClient.name
    form.surname = newClient.surname
    form.email = newClient.email
    form.phone = newClient.phone
    form.id_zona = newClient.id_zona
    form.type = newClient.type
    form.ud_operativa_fk = newClient.ud_operativa_fk
    form.type_bak = newClient.type_bak
    zonasOperarioSeleccionadas(newClient.name)

  },{inmediate:true}
)

const selectZona = computed(() => {
  return plantasStore.getZonas.map((zona) => {
    return { value: zona.id, label: zona.name }
  })
})

const selectUO = computed(() => {
  return plantasStore.getUnidadesOperativas.map((uo) => {
    return { value: uo.id, label: uo.name }
  })
})

const zonasOperario = computed(() => {
  return plantasStore.getZonas.filter(
    (zona) => zona.id_unidades_operativas_fk === form.unidad_operativa
  )
})
const isChecked = (zonaId) => {
  return form.zonas.some(z => z.id === zonaId)
}

const buscaZonasUO = (uo) => {
  // zonasUoOperario = plantasStore.getZonas.filter((zona) => zona.id_unidades_operativas_fk === uo)
  if (!uo) {
    console.warn('El valor de unidad operativa es undefined o null')
    return []
  }
  return plantasStore.getZonas
    .filter((zona) => zona.unidades_operativas_fk === uo)
    .map((zona) => {
      // return { id: zona.id, name: zona.name }
      return { value: zona.id, label: zona.name }
    })
}

const zonasOperarioSeleccionadas = async (nombre) => {
  // console.log('zonasOperario: ', data)
  const zonas = await searchZonasOperarios(nombre)
  console.log('zonas: ',zonas);
  // form.zonas= zonas.flatMap(zona => zona.zonas_personal.map(zone => ({
    form.zonas = zonas.flatMap(zona => zona.zonas_personal.map(zone => zone.zonas_abastecimiento.id))
   
    // return{id:id,name:name}
   
   
  console.log('Form.zonas ',form.zonas);
  //  return zones
  
  
  // return searchZonasOperarios(nombre).map((zona) => { return { id: zona.zonas_personal.zonas_abastecimiento.id, name: zona.zonas_personal.zonas_abastecimiento.name } })
}
zonasOperarioSeleccionadas(form.name)

const submit = () => {
  //
}
</script>

<template>
  <SectionMain>
    <!-- <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Formulario de Analítica" main>
        <BaseButton
          href="https://www.aqlara.com"
          target="_blank"
          :icon="mdiMail"
          label="Aqlara"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton> -->
    <CardBox form @submit.prevent="submit">
      <div class="grid md-grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormKit
          v-model="form.name"
          type="text"
          label="Nombre"
          validation="required"
          class="w-full"
        />
        <!-- <FormKit
          v-model="form.surname"
          type="text"
          label="Apellidos"
          validation="required"
          class="w-full"
        /> -->
        <FormKit
          v-model="form.email"
          type="email"
          label="e-mail"
          validation="required"
          class="w-full"
        />
      </div>

      <div class="grid md-grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FormKit
          v-model="form.ud_operativa_fk"
          type="select"
          label="Unidad Operativa"
          validation="required"
          disabled
          class="w-full"
          :options="selectUO"
        />
        <!-- <FormKit
          v-model="form.id_zona"
          type="select"
          label="Zona"
          validation="required"
          class="w-full"
          :options="selectZona"
        /> -->
        <FormKit
          v-model="form.type"
          :value="returnTipoOperario(form.type)"
          :options="plantasStore.getTipoPersonal.map(tipo => ({ value: tipo.id, label: tipo.tipo }))"
          type="select"
          label="Tipo"
          validation="required"
          disabled
          class="w-full"
        />
      </div>

      <!-- <div class="grid md-grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FormKit
          v-model="form.comunidad"
          type="select"
          label="Unidad Operativa"
          validation="required"
          class="w-full"
        />
        <FormKit
          v-model="form.comunidad"
          type="select"
          label="Comunidad Autónoma"
          validation="required"
          class="w-full"
        />
      </div> -->

      <div class="grid md-grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <!-- <FormKit
          v-for="zone in buscaZonasUO(form.ud_operativa_fk)"
          :key="zone.id"
          type="checkbox"
          :label="zone.name"
          :help="zone.id"
          name="terms"
          :value="false"
          validation="accepted"
          validation-visibility="dirty"
        />
        <pre wrap>Zonas</pre>
        <FormKit
          v-for="zona in zonasOperarioSeleccionadas(form.name)"
          :key="zona.id"
          type="checkbox"
          :label="zona.name"
          :help="zona.id"
          name="terms"
          :value="true"
          validation="accepted"
          validation-visibility="dirty"
        /> -->

        <!-- <FormKit
          v-for="zona in buscaZonasUO(form.ud_operativa_fk)"
          :key="zona.id"
          v-model="form.zonas"
          type="checkbox"
          :label="zona.label"
          :help="zona.id"
          name="zonas"
        /> -->
        <div class='w-full'>

          <FormKit
          v-model="form.zonas"
            :options="buscaZonasUO(form.ud_operativa_fk)"      
            type="checkbox"
            name="zonas"
            options-class="mb-4 flex jutify-between items-center space-x-2 p-10 rounded-md w-full"
            option-class="w-full"
            
          />
        </div>
            </div>
            <!-- <div class="grid md-grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <FormKit
          v-for="zona in buscaZonasUO(form.ud_operativa_fk)"
          :key="zona.id"
          type="checkbox"
          :label="zona.name"
          :help="zona.id"
          name="terms"
          :value="zonasOperarioSeleccionadas(form.name).some(selectedZona => selectedZona.id === zona.id)"
          validation="accepted"
          validation-visibility="dirty"
        />
          v-for="zona in plantasStore.getZonas"
          :key="zona.id"
          type="checkbox"
          :label="zona.name"
          :help="zona.id"
          name="terms"
          :value="false"
          validation="accepted"
          validation-visibility="dirty"
        />
        <pre wrap>Zonas</pre>
      </div> -->

      <!-- <FormField label="Nombre Operario">
        <FormControl v-model="form.name" :icon="mdiAccount" />
        <FormControl v-model="form.email" type="email" :icon="mdiMail" />
      </FormField>
      <div>
        <!

        <FormField>
          <FormField label="Fecha" help="Fecha">
            <FormControl v-model="form.phone" type="date" placeholder="Fecha" />
          </FormField>
          <FormField label="Zona" help="Fecha">
            <FormControl
              v-model="form.zona"
              type="select"
              :options="
                plantasStore.getZonas.map((zona) => ({
                  label: zona.nombre,
                  value: zona.id,
                  selected: zona.id === props.client.zona
                }))
              "
            />
          </FormField>
        </FormField>
        <FormField>
          <FormField label="Telefono">
            <FormControl v-model="form.phone" type="input"></FormControl>
          </FormField>
          <FormField label="Cargo">
            <FormControl
              v-model="form.type"
              type="select"
              :options="[
                { label: 'Operario', value: 5 },
                { label: 'Administrativo', value: 4 },
                { label: 'Técnico', value: 3 },
                { label: 'Responsable de UO', value: 2 }
              ]"
            ></FormControl>
            <FormControl type="input" label="Hola"></FormControl>
            <FormControl
              v-model="form.permision"
              type="select[multiple]"
              :options="[
                { label: 'Administrador', value: 5 },
                { label: 'Editor', value: 4 },
                { label: 'Creador', value: 3 },
                { label: 'Consulta', value: 2 }
              ]"
            ></FormControl>
          </FormField>
        </FormField>

        <FormField label="Contraseña">
          <FormControl
            v-model="form.prueba"
            type="select"
            :options="[
              { label: 'Administrador', value: 5 },
              { label: 'Editor', value: 4 },
              { label: 'Creador', value: 3 },
              { label: 'Consulta', value: 2 }
            ]"
          ></FormControl>
        </FormField>

        <FormKit
          v-model="form.color"
          type="select"
          :options="[
            { label: 'Rojo', value: 'red' },
            { label: 'Verde', value: 'green' },
            { label: 'Azul', value: 'blue' }
          ]"
          label="Color"
        /> -->

        <!-- <div>
          <BaseDivider />
        </div> -->
      <!-- </div> -->
      <template #footer>
        <BaseButtons>
          <BaseButton type="submit" color="info" label="Guardar" />
          <BaseButton type="reset" color="danger" outline label="Cancelar" />
        </BaseButtons>
      </template>
    </CardBox>
  </SectionMain>
</template>
