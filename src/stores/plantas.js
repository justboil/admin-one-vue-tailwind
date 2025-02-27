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
  const tipo_infraestructura = ref([])
  const zonas_infraestructuras = ref([])
  const analiticaToUpdate = ref(null)
  const tipoPersonal = ref([])
  const zonas_personal = ref([])

  // onMounted(() => {
  //   loadZonas()
  //   loadOperarios()
  //   loadAnaliticas()
  //   loadPuntosMuestreo()
  //   loadUnidadesOperativas()
  //   loadComunidadesAutonomas()
  //   loadInfraestructuras()
  //   loadTipoInfraestructura()
  //   loadZonasInfraestructuras()
  //   loadTipoPersonal()
  // })

  // Función para inicializar todos los datos
  const initializeStore = async () => {
    try {
      await Promise.all([
        loadZonas(),
        loadOperarios(),
        loadAnaliticas(),
        loadPuntosMuestreo(),
        loadUnidadesOperativas(),
        loadComunidadesAutonomas(),
        loadInfraestructuras(),
        loadTipoInfraestructura(),
        loadZonasInfraestructuras(),
        loadTipoPersonal()
      ])
    } catch (error) {
      console.error('Error inicializando store:', error)
    }
  }

  const loadZonas = async () => {
    const { data } = await supabase.from('zonas_abastecimiento').select('*')
    zonas.value = data
  }
  // const loadOperarios = async () => {
  //   const { data } = await supabase.from('personal').select('*')
  //   operarios.value = data
  // }
  const loadZonasOperarios = async () => {
    const { data } = await supabase.from('zonas_personal').select('*')
    zonas_personal.value = data
  }
  // const loadAnaliticas = async () => {
  //   const { data } = await supabase.from('analiticas').select('*')
  //   analiticas.value = data
  // }

  const loadAnaliticas = async () => {
    try {
      const { data, error } = await supabase
        .from('analiticas')
        .select(`
          *,
          puntos_muestreo (
            id,
            name,
            infraestructuras (
              id,
              name,
              zonas_abastecimiento (
                id,
                name,
                unidades_operativas (
                  id,
                  name
                ),
                comunidades_autonomas (
                  id,
                  name
                )
              )
            )
          )
        `)
  
      if (error) throw error
  
      if (data) {
        const mappedData = data.map(item => {
          const puntoMuestreo = item.puntos_muestreo
          const infraestructura = puntoMuestreo?.infraestructuras || {}
          const zonaAbastecimiento = infraestructura?.zonas_abastecimiento || {}
          const unidadOperativa = zonaAbastecimiento?.unidades_operativas || {}
          const comunidadAutonoma = zonaAbastecimiento?.comunidades_autonomas || {}
  
          return {
            ...item,
            punto_muestreo_id: puntoMuestreo?.id,
            punto_muestreo_name: puntoMuestreo?.name,
            infraestructura_id: infraestructura?.id,
            infraestructura_name: infraestructura?.name,
            zona_id: zonaAbastecimiento?.id,
            zona_name: zonaAbastecimiento?.name,
            unidad_id: unidadOperativa?.id,
            unidad_name: unidadOperativa?.name,
            comunidad_id: comunidadAutonoma?.id,
            comunidad_name: comunidadAutonoma?.name
          }
        })
        
        analiticas.value = mappedData
        return mappedData
      }
  
    } catch (error) {
      console.error('Error al cargar analíticas:', error.message)
      throw error
    }
  }

  // Modificar loadOperarios para incluir las zonas de cada operario
const loadOperarios = async () => {
  try {
    const { data: operariosData, error } = await supabase.from('personal').select('*')
    
    if (error) throw error

    const {data:zonasPersonal } = await supabase.from('zonas_personal').select('*')
    
    // Enriquecer cada operario con sus zonas asignadas
    operarios.value = operariosData.map(operario => {
      // Filtrar las relaciones de zonas_personal para este operario



      const relacionesZonas = zonasPersonal.filter(
        relacion => relacion.personal_fk === operario.id).map(relacion => relacion.zonas_fk)
    

      // console.log('relacionesZonas: ',relacionesZonas);
      
      // Obtener los IDs de las zonas asignadas a este operario
      // const zonasIds = relacionesZonas.map(relacion => relacion.zonas_fk)

      // console.log('zonasIds: ',zonasIds);
      
      // Buscar los datos completos de cada zona
      // const zonasOperario = zonas.value.filter(zona => 
      //   zonasIds.includes(zona.id)
      // )
      
     // console.log('zonasOperario:',zonasOperario)
      // Añadir las zonas al objeto operario
      return {
        ...operario,
        zonas: relacionesZonas || []
      }
    })
    
    return operarios.value
  } catch (error) {
    console.error('Error cargando operarios:', error)
    return []
  }
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
  const loadTipoInfraestructura = async () => {
    const { data } = await supabase.from('tipo_infraestructura').select('*')
    tipo_infraestructura.value = data
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
  const getTipoInfraestructura = computed(() => {
    return tipo_infraestructura.value
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

  // Añadir un computed getter para facilitar el acceso a las zonas de un operario específico
const getZonasOperario = computed(() => {
  return (operarioId) => {
    const operario = operarios.value.find(op => op.id === operarioId)
    return operario?.zonas || []
  }
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
    getTipoInfraestructura,
    getTipoPersonal,
    tipo_infraestructura,
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
    analiticaToUpdate,
    initializeStore,
    zonas_personal,
    loadZonasOperarios,
    getZonasOperario
  }
})
