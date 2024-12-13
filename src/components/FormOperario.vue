<script setup>
import { computed, reactive, toValue, watch } from 'vue'
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

const plantasStore = usePlantasStore()

const props = defineProps({
  client: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const form = reactive({
  name: props.client?.name || 'Nombre',
  surname: props.client?.surname || 'Apellidos',
  email: props.client?.email || 'email@example.com',
  phone: props.client?.phone,
  id_zona: props.client?.id_zona,
  color: '',
  olor: [],
  sabor: '',
  tipo: '',
  prueba: '5'
})

watch(
  () => props.client,
  (newClient) => {
    form.name = newClient.name
    form.surname = newClient.surname
    form.email = newClient.email
    form.phone = newClient.phone
    form.id_zona = newClient.id_zona
    form.type = newClient.type
  }
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
  return plantasStore.getZonas.filter(( zona ) => zona.id_unidad_operativa === form.unidad_operativa)
}
)

console.log(form.zona)

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
          v-model="form.unidad_operativa"
          type="select"
          label="Unidad Operativa"
          validation="required"
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
          type="text"
          label="Tipo"
          validation="required"
          class="w-full"
          
        />
      </div>

      <div class="grid md-grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>

      <div>
        <!-- <FormKit
        
    />
    <pre wrap>{{ value }}</pre>
  </FormKit> -->
      </div>

      <FormField label="Nombre Operario">
        <FormControl v-model="form.name" :icon="mdiAccount" />
        <FormControl v-model="form.email" type="email" :icon="mdiMail" />
      </FormField>
      <div>
        <!-- <BaseDivider /> -->

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
        />

        <div>
          <BaseDivider />
        </div>
      </div>
      <template #footer>
        <BaseButtons>
          <BaseButton type="submit" color="info" label="Guardar" />
          <BaseButton type="reset" color="danger" outline label="Borrar" />
        </BaseButtons>
      </template>
    </CardBox>
  </SectionMain>
</template>
