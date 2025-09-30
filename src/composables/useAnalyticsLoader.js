import { ref, computed } from 'vue'
import { usePlantasStore } from '@/stores/plantas'

/**
 * Composable para manejar la carga inteligente de analíticas
 * Evita cargas innecesarias y optimiza el rendimiento
 */
export function useAnalyticsLoader() {
  const plantasStore = usePlantasStore()
  const loading = ref(false)
  const error = ref(null)

  // Estado de las analíticas
  const isLoaded = computed(() => plantasStore.isAnalyticasLoaded)
  const count = computed(() => plantasStore.analyticsCount)
  const data = computed(() => plantasStore.getAnaliticas)

  /**
   * Carga analíticas solo si no están ya cargadas
   * @param {boolean} force - Forzar recarga incluso si ya están cargadas
   */
  const loadAnalytics = async (force = false) => {
    if (!force && isLoaded.value) {
      console.log(`✅ Analíticas ya cargadas (${count.value} registros)`)
      return data.value
    }

    loading.value = true
    error.value = null

    try {
      console.log('🔄 Cargando analíticas...')
      const result = await plantasStore.loadAnaliticas()
      console.log(`✅ ${count.value} analíticas cargadas`)
      return result
    } catch (err) {
      error.value = err
      console.error('❌ Error cargando analíticas:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Carga analíticas para exportación
   * Muestra advertencias apropiadas
   */
  const loadForExport = async () => {
    if (!isLoaded.value) {
      console.warn('⚠️ Cargando todas las analíticas para exportación...')
      console.warn('💡 Considera usar exportación de seleccionados para mejor rendimiento')
      await loadAnalytics()
    }
    return data.value
  }

  /**
   * Limpia las analíticas del store
   * Útil para liberar memoria cuando no se necesiten
   */
  const clearAnalytics = () => {
    plantasStore.analiticas = []
    console.log('🧹 Analíticas limpiadas del store')
  }

  /**
   * Verifica si las analíticas necesitan ser cargadas para una operación específica
   */
  const needsLoading = (operationType = 'general') => {
    if (isLoaded.value) return false

    const messages = {
      'export': '📊 Se necesita cargar analíticas para exportación',
      'table': '📋 Se necesita cargar analíticas para mostrar tabla',
      'filter': '🔍 Se necesita cargar analíticas para filtrado',
      'general': '📈 Se necesita cargar analíticas'
    }

    console.info(messages[operationType] || messages.general)
    return true
  }

  return {
    // Estado
    loading,
    error,
    isLoaded,
    count,
    data,
    
    // Métodos
    loadAnalytics,
    loadForExport,
    clearAnalytics,
    needsLoading
  }
}