import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { supabase } from '@/helpers/supabase'

export const usePlantasStore = defineStore('plantasStore', () => {
  const zonas = ref([])
  const operarios = ref([])
  const analiticas = ref([])
  const puntosMuestreo = ref([])
  const unidadesOperativas = ref([])
  const comunidadesAutonomas = ref([])

  onMounted(() => {
    loadZonas()
    loadOperarios()
    loadAnaliticas()
    loadPuntosMuestreo()
    loadUnidadesOperativas()
    loadComunidadesAutonomas()
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

  return {
    getZonas,
    getOperarios,
    getAnaliticas,
    getPuntosMuestreo,
    getUnidadesOperativas,
    getComunidadesAutonomas,
    zonas,
    operarios,
    analiticas,
    puntosMuestreo,
    unidadesOperativas,
    comunidadesAutonomas
  }
})
