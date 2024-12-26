import { computed, reactive } from 'vue'
import { usePlantasStore } from '@/stores/plantas'

export default function useFormSelectData() {
  const plantasStore = usePlantasStore()

  const form = reactive({
    uo: null,
    zona: null,
    punto_muestreo_fk: null,
    fecha: '',
    color: '',
    olor: '',
    sabor: '',
    cloro: '',
    type: '',
    observaciones: '',
    ph: null,
    turbidez: null,
    operario: null,
      infraestructura: null,
      fecha_inicio: null,
    fecha_final:null,

  })
  const selectUO = computed(() => {
    return plantasStore.getUnidadesOperativas.map((uo) => {
      return { value: uo.id, label: uo.name }
    })
  })
  const selectZona = computed(() => {
    if (!form.uo) return []
    return plantasStore.getZonas
      .filter((zona) => zona.unidades_operativas_fk === form.uo)
      .map((zona) => {
        return { value: zona.id, label: zona.name }
      })
  })

  const selectInfraestructura = computed(() => {
    if (!form.zona) return []
    const infraestructuras = plantasStore.getZonasInfraestructuras
      .filter((infraestructura) => infraestructura.zonas_fk === form.zona)
      .map((infraestructura) => {
        // console.log(':Infraestructura: ',infraestructura)
        return {
          value: infraestructura.infraestructuras_fk,
          label: buscaInfraestructuraPorId(infraestructura.infraestructuras_fk)
        }
      })
    return infraestructuras
  })

  const buscaInfraestructuraPorId = (id) => {
    const infraestructura = plantasStore.getInfraestructuras.find(
      (infraestructura) => infraestructura.id === id
    )
    if (infraestructura) {
      return infraestructura.name
    } else {
      return ''
    }
  }

  const selectPuntosMuestra = computed(() => {
    if (!form.infraestructura) return []
    return plantasStore.getPuntosMuestreo
      .filter((punto) => punto.infraestructura_fk === form.infraestructura)
      .map((punto) => {
        return { value: punto.id, label: punto.name }
      })
  })

  // const selectPunto = computed(() => {
  //   if (!form.zona) return []
  //   return plantasStore.getPuntosMuestreo
  //     .filter((punto) => punto.zonas_abastecimiento_fk === form.zona)
  //     .map((punto) => {
  //       return { value: punto.id, label: punto.name }
  //     })
  // })

  const operarioPorZona = computed(() => {
    if (!form.zona) return []
    return plantasStore.getOperarios
      .filter((operario) => operario.ud_operativa_fk === form.uo)
      .map((operario) => {
        return { value: operario.id, label: operario.name }
      })
  })

  return {
    form,
    selectUO,
    selectZona,
    selectInfraestructura,
    selectPuntosMuestra,
    operarioPorZona
  }
}
