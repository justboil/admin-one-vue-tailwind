import { ref, reactive, computed, watch } from 'vue'
import { getAnaliticasPaginated } from '@/services/analiticas'

export function useServerPagination(initialOptions = {}) {
  const loading = ref(false)
  const error = ref(null)
  
  // Estado de la paginación
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  })

  // Estado del ordenamiento
  const sorting = reactive({
    sortBy: 'fecha',
    sortOrder: 'desc'
  })

  // Filtros
  const filters = reactive({
    fecha_inicio: null,
    fecha_final: null,
    punto_muestreo_fk: null,
    personal_fk: null,
    type: null,
    zona_fk: null
  })

  // Búsqueda
  const searchText = ref('')

  // Datos
  const data = ref([])

  // Computed para información de paginación
  const paginationInfo = computed(() => ({
    from: (pagination.page - 1) * pagination.pageSize + 1,
    to: Math.min(pagination.page * pagination.pageSize, pagination.totalItems),
    total: pagination.totalItems,
    currentPage: pagination.page,
    totalPages: pagination.totalPages
  }))

  // Función para cargar datos
  const loadData = async () => {
    loading.value = true
    error.value = null

    try {
      const options = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        filters: { ...filters },
        searchText: searchText.value
      }

      const result = await getAnaliticasPaginated(options)

      data.value = result.data
      pagination.totalItems = result.count
      pagination.totalPages = result.totalPages
      pagination.hasNextPage = result.hasNextPage
      pagination.hasPreviousPage = result.hasPreviousPage

    } catch (err) {
      console.error('Error loading paginated data:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Funciones de navegación
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      pagination.page = page
    }
  }

  const nextPage = () => {
    if (pagination.hasNextPage) {
      pagination.page++
    }
  }

  const previousPage = () => {
    if (pagination.hasPreviousPage) {
      pagination.page--
    }
  }

  const changePageSize = (newPageSize) => {
    pagination.pageSize = newPageSize
    pagination.page = 1 // Reset a primera página
  }

  // Funciones de ordenamiento
  const toggleSort = (column) => {
    if (sorting.sortBy === column) {
      sorting.sortOrder = sorting.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      sorting.sortBy = column
      sorting.sortOrder = 'asc'
    }
    pagination.page = 1 // Reset a primera página
  }

  // Función para aplicar filtros
  const applyFilters = (newFilters) => {
    Object.assign(filters, newFilters)
    pagination.page = 1 // Reset a primera página
  }

  // Función para limpiar filtros
  const clearFilters = () => {
    Object.keys(filters).forEach(key => {
      filters[key] = null
    })
    searchText.value = ''
    pagination.page = 1
  }

  // Función para buscar
  const search = (text) => {
    searchText.value = text
    pagination.page = 1 // Reset a primera página
  }

  // Función de refresh
  const refresh = () => {
    loadData()
  }

  // Watch para recargar datos cuando cambian los parámetros
  watch(
    [() => pagination.page, () => pagination.pageSize, sorting, filters, searchText],
    () => {
      loadData()
    },
    { deep: true }
  )

  return {
    // Estado
    loading,
    error,
    data,
    pagination,
    sorting,
    filters,
    searchText,
    
    // Computed
    paginationInfo,
    
    // Métodos
    loadData,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    toggleSort,
    applyFilters,
    clearFilters,
    search,
    refresh
  }
}