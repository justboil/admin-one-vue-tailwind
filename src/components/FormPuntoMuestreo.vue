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
import { setOperarios } from '@/services/operarios'
import OperariosView from '@/views/OperariosView.vue'
import { FormKit } from '@formkit/vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'

// const zonasUoOperario = ref([]);

// const emits = defineEmits(['cancelModal', 'closeModal'])

const emit = defineEmits(['submit', 'closeModal'])

const plantasStore = usePlantasStore()

const zoom = ref(13)

const props = defineProps({
  uo: {
    type: Object,
    required: true,
    default: () => ({esNuevo: true})
  }
})

const form = reactive({
  esNuevo: props.uo?.esNuevo ?? true,
  id: props.uo?.id || null,
  name: props.uo?.name,
  infraestructura_fk: props.uo?.infraestructura_fk,
  zona_fk: props.uo?.zona_fk,
  posicion: props.uo?.posicion,
})

const submitHandler = () => {
  console.log('submitHandler')
  // Validar formulario
  if (!form.name || !form.infraestructura_fk || !form.zona_fk) {
    console.error('Faltan campos requeridos')
    return false
  }

  const uoData = {
    id: form.id,
    name: form.name,
    infraestructura_fk: form.infraestructura_fk,
    zona_fk: form.zona_fk,
    posicion: form.posicion,
    esNuevo: form.esNuevo
  }
  emit('submit', uoData)
  // return uoData
}

const selectInfraestructura = computed(() => {
  return plantasStore.getInfraestructuras.map((inf) => {
    return { value: inf.id, label: inf.name }
  })
})

const selectZona = computed(() => {
  return plantasStore.getZonas.map((zona) => {
    return { value: zona.id, label: zona.name }
  })
})

const zonasPorComunidadAutonoma = (ca) => {
  const comAut = plantasStore.getZonas
    .filter((zona) => zona.com_autonoma_fk === ca)
    .map((zona) => {
      return { value: zona.id, label: zona.name }
    })
  // console.log('comAut: ', comAut)
  return comAut
}

const getZonas = computed(() => {
  const zonas = plantasStore.getZonas.map((zona) => {
    return { value: zona.id, label: zona.name }
  })
  console.log('ZONAS: ', zonas)
  return zonas
})

watch(
  () => props.uo,
  (newUO) => {
    form.esNuevo = newUO?.esNuevo
    form.id = newUO?.id
    form.name = newUO?.name
    form.infraestructura_fk = newUO?.infraestructura_fk
    form.zona_fk = newUO?.zona_fk,
    form.posicion = newUO?.posicion
  },
  { inmediate: true }
)

const zonasUOSeleccionadas = async (id) => {
  if (!id) {
    console.warn('El valor de id es undefined o null')
    return []
  }

  const zonas = plantasStore.getZonas
    .filter((zona) => zona.unidades_operativas_fk === id)
    .map((zona) => {
      return zona.id
    })
  // console.log('ZONAS SELECCIONADAS: ', zonas)
  form.zonas = zonas
}

zonasUOSeleccionadas(form.id)

defineExpose({
  submitHandler
})
</script>

<template>
  <SectionMain>
    <!-- <CardBox form @submit.prevent="submit"> -->
    <CardBox is-form>
      <form class="w-full" @submit.prevent="submitHandler">
        <div class="grid grid-cols-1 lg:grid-cols-6 mb-6 gap-4 w-full">
          <div class="col-span-1 w-full">
            <FormKit
              v-model="form.id"
              type="text"
              label="Código"
              placeholder="Nº SINAC"
              validation="required"
              class="col-span-1 w-full"
              :disabled="form.esNuevo?false:true"
            />
          </div>
          <div class="col-span-5 w-full">
            <FormKit
              v-model="form.name"
              type="text"
              label="Nombre"
              placeholder="Nombre"
              validation="required"
              class="col-span-3 w-full"
            />
          </div>
        </div>
        <div class="flex flex-col w-full md:flex-row md:space-x-4 md:space-y-0 space-y-4 mb-6">
          <FormKit
            v-model="form.infraestructura_fk"
            :options="selectInfraestructura"
            type="select"
            label="Infraestructura"
            placeholder="Infraestructura"
            class="w-full"
            option-class="w-full"
          />
          <FormKit
            v-model="form.zona_fk"
            :options="selectZona"
            type="select"
            label="Zona"
            placeholder="Zona"
            class="w-full"
            option-class="w-full"
          />
          
        </div>
        <div style="height: 300px; width: 95%">
            <l-map
              ref="map"
              v-model:zoom="zoom"
              :center="form.posicion?[form.posicion.lat, form.posicion.lon]:[39.54982998070428, -0.4656852311920545]"
              :use-global-leaflet="false"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>
                <l-marker 
                :lat-lng="form.posicion?[form.posicion.lat, form.posicion.lon]:[39.54982998070428, -0.4656852311920545]"
                draggable 
                @dragend="(e) => { 
                  form.posicion = {
                  lat: e.target.getLatLng().lat, 
                  lon: e.target.getLatLng().lng
                  }
                  console.log('New position:', form.posicion)
                }"
                >
                <l-tooltip>
                  <div class="text-center">
                  <h1 class="text-lg font-bold">AQLARA Headquarters</h1>
                  <p class="text-sm">Oficinas Centrales</p>
                  </div>
                </l-tooltip>
                
                <l-popup>
                  <div class="text-center">
                  <h1 class="text-lg font-bold">Punto 1</h1>
                  <a href="http://google.com" target="_blank" class="text-sm"
                    >Ver en Google Maps</a
                  >
                  <p class="text-sm">Muestra 1</p>
                  </div>
                </l-popup>
                </l-marker>
              <!-- <div v-for="punto in plantasStore.getPuntosMuestreo" :key="punto.id">
                <l-marker
                v-if="punto.posicion"
                :lat-lng="[punto.posicion.lat, punto.posicion.lon]"
                draggable
                @dragend="onDragEnd"
                >
                <l-tooltip>
                  <div class="text-center">
                      <h1 class="text-lg font-bold">{{ punto.name }}</h1>
                      <p class="text-sm">id: {{ punto.id }}</p>
                    </div>
                  </l-tooltip>

                  <l-popup>
                    <div class="text-center">
                      <h1 class="text-lg font-bold">{{ punto.name }}</h1>
                      <p class="text-sm">SINAC Id: {{ punto.id }}</p>
                      <BaseButton
                      label="Añadir analítica"
                        color="info"
                        @click="crearAnalitica(punto)"
                      ></BaseButton>
                    </div>
                  </l-popup>
                </l-marker>
              </div> -->
            </l-map>
            
          </div>

        <!-- <div v-if="form.comunidadAutonoma" class="grid md-grid-cols-1 md:grid-cols-4 gap-4 mb-6"> -->
        <!-- <div class="w-full" v-for="zona in zonasPorComunidadAutonoma(form.comunidadAutonoma)" :key="zona.id"> -->

        
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </form>
      <template #footer>
        <BaseButtons>
          <BaseButton type="submit" color="info" label="Guardar" @click="emit('submit', form)" />
          <BaseButton type="submit" color="info" label="imprime" @click="console.log(form)" />
          <BaseButton
            type="reset"
            color="danger"
            outline
            label="Cancelar"
            @click="emit('closeModal')"
          />
        </BaseButtons>
      </template>
    </CardBox>
  </SectionMain>
</template>
