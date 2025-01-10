import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { supabase } from '@/services/supabase'

export const usePlantasStore = defineStore('plantasStore', () => {
  const zonas = ref([])
  const operarios = ref([])
  const analiticas = ref([])
  const puntosMuestreo = ref([])
  const unidadesOperativas = ref([])
  const comunidadesAutonomas = ref([])
  const formZonas = ref([])
  const infraestructuras = ref([])
  const zonas_infraestructuras = ref([])
  const analiticaToUpdate = ref(null)
  const tipoPersonal = ref([])

  onMounted(() => {
    loadZonas()
    loadOperarios()
    loadAnaliticas()
    loadPuntosMuestreo()
    loadUnidadesOperativas()
    loadComunidadesAutonomas()
    loadInfraestructuras()
    loadZonasInfraestructuras()
    loadTipoPersonal()
  })

  const loadZonas = async () => {
    const { data } = await supabase.from('zonas_abastecimiento').select('*')
    zonas.value = data
  }
  const loadOperarios = async () => {
    const { data } = await supabase.from('personal').select('*')
    operarios.value = data
  }
  const loadAnaliticas = async () => {
    const { data } = await supabase.from('analiticas').select('*')
    analiticas.value = data
  }

  const loadTipoPersonal = async () => {
    const { data } = await supabase.from('tipo_personal').select('*')
    tipoPersonal.value = data
  }

  const loadPuntosMuestreo = async () => {
    const { data } = await supabase.from('puntos_muestreo').select('*')
    puntosMuestreo.value = data
  }
  const loadUnidadesOperativas = async () => {
    const { data } = await supabase.from('unidades_operativas').select('*')
    unidadesOperativas.value = data
  }
  const loadComunidadesAutonomas = async () => {
    const { data } = await supabase.from('comunidades_autonomas').select('*')
    comunidadesAutonomas.value = data
  }

  const loadZonasInfraestructuras = async () => {
    const { data } = await supabase.from('zonas_infraestructuras').select('*')
    zonas_infraestructuras.value = data
  }

  const loadInfraestructuras = async () => {
    const { data } = await supabase.from('infraestructuras').select('*')
    infraestructuras.value = data
  }

  const getZonas = computed(() => {
    return zonas.value
  })

  const getOperarios = computed(() => {
    return operarios.value
  })

  const getAnaliticas = computed(() => {
    return analiticas.value
  })

  const getPuntosMuestreo = computed(() => {
    return puntosMuestreo.value
  })
  const getUnidadesOperativas = computed(() => {
    return unidadesOperativas.value
  })
  const getComunidadesAutonomas = computed(() => {
    return comunidadesAutonomas.value
  })

  const getInfraestructuras = computed(() => {
    return infraestructuras.value
  })
  const getZonasInfraestructuras = computed(() => {
    return zonas_infraestructuras.value
  })

  const getTipoPersonal = computed(() => {
    return tipoPersonal.value
  })

  const getPuntosMuestreoTotal = computed(() => {
    //quiero qeu devuelva todos los puntos de muestreo con su zona de abastecimiento y su zona de infraestructura
    return puntosMuestreo.value.map((punto) => {
      const zonaAbastecimiento = zonas.value.find((zona) => zona.id === punto.zona_fk)
      const zonaInfraestructura = infraestructuras.value.find(
        (infraestructura) => infraestructura.id === punto.infraestructura_fk
      )
      return {
        ...punto,
        zonaAbastecimiento,
        zonaInfraestructura
      }
    })
  })

  const getAnaliticasTotal = computed(() => {
    //quiero qeu devuelva todos los puntos de muestreo con su zona de abastecimiento y su zona de infraestructura

    return analiticas.value.map((analitica) => {
      const puntoMuestreo = puntosMuestreo.value.find(
        (punto) => punto.id === analitica.punto_muestreo_fk
      )

      if (puntoMuestreo) {
        
        const zona_fk = puntoMuestreo.zona_fk
        const infraestructura_fk = puntoMuestreo.infraestructura_fk

        
        
        return {
          ...analitica,
          zona_fk,
          infraestructura_fk,
        }
      }
    })
  })

  // getTipoOperario = (id) => {
  //   const operario = operarios.value.find((operario) => operario.id === id)
  //   if (operario) {
  //     return operario.tipo
  //   } else {
  //     return ''
  //   }
  // }

  return {
    getZonas,
    getOperarios,
    getAnaliticas,
    getPuntosMuestreo,
    getUnidadesOperativas,
    getComunidadesAutonomas,
    getInfraestructuras,
    getZonasInfraestructuras,
    getTipoPersonal,
    zonas,
    operarios,
    analiticas,
    puntosMuestreo,
    unidadesOperativas,
    comunidadesAutonomas,
    formZonas,
    infraestructuras,
    zonas_infraestructuras,
    tipoPersonal,
    loadAnaliticas,
    getPuntosMuestreoTotal,
    getAnaliticasTotal,
    loadOperarios,
    loadZonas,
    loadPuntosMuestreo,
    loadUnidadesOperativas,
    loadComunidadesAutonomas,
    loadInfraestructuras,
    loadZonasInfraestructuras,
    loadTipoPersonal,
    analiticaToUpdate
  }
})
