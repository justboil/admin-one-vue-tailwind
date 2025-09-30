import { supabase } from './supabase'

export const getAnaliticas = async() => {
    const { data } = await supabase.from('analiticas').select('*')
      return data
    }

export const getAnaliticasPaginated = async (options = {}) => {
  const {
    page = 1,
    pageSize = 20,
    sortBy = 'fecha',
    sortOrder = 'desc',
    filters = {},
    searchText = ''
  } = options

  let query = supabase
    .from('analiticas')
    .select(`
      *,
      personal:personal_fk(id, name),
      punto_muestreo:punto_muestreo_fk(id, name, zona_fk)
    `, { count: 'exact' })

  // Aplicar filtros
  if (filters.fecha_inicio) {
    query = query.gte('fecha', filters.fecha_inicio)
  }
  if (filters.fecha_final) {
    query = query.lte('fecha', filters.fecha_final)
  }
  if (filters.punto_muestreo_fk) {
    query = query.eq('punto_muestreo_fk', filters.punto_muestreo_fk)
  }
  if (filters.personal_fk) {
    query = query.eq('personal_fk', filters.personal_fk)
  }
  if (filters.type) {
    query = query.eq('type', filters.type)
  }
  if (filters.zona_fk) {
    query = query.eq('punto_muestreo.zona_fk', filters.zona_fk)
  }

  // Búsqueda de texto en observaciones
  if (searchText) {
    query = query.ilike('observaciones', `%${searchText}%`)
  }

  // Ordenamiento
  const orderDirection = sortOrder === 'desc' ? false : true
  query = query.order(sortBy, { ascending: orderDirection })

  // Paginación
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching paginated analiticas:', error)
    throw error
  }

  return {
    data,
    count,
    page,
    pageSize,
    totalPages: Math.ceil(count / pageSize),
    hasNextPage: page * pageSize < count,
    hasPreviousPage: page > 1
  }
}

export const getAnaliticasFilteredCount = async (filters = {}) => {
  let query = supabase
    .from('analiticas')
    .select('*', { count: 'exact', head: true })

  // Aplicar los mismos filtros que en getAnaliticasPaginated
  if (filters.fecha_inicio) query = query.gte('fecha', filters.fecha_inicio)
  if (filters.fecha_final) query = query.lte('fecha', filters.fecha_final)
  if (filters.punto_muestreo_fk) query = query.eq('punto_muestreo_fk', filters.punto_muestreo_fk)
  if (filters.personal_fk) query = query.eq('personal_fk', filters.personal_fk)
  if (filters.type) query = query.eq('type', filters.type)

  const { count, error } = await query

  if (error) throw error
  return count
}

export const setAnaliticas = async(analitica) => {
  const { data } = await supabase.from('analiticas').insert(analitica)
  return data
}
