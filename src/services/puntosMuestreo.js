import { supabase } from './supabase'

export const createPuntoMuestreo = async (data) => {
    const { data: puntoMuestreo, error } = await supabase
        .from('puntos_muestreo')
        .insert({
            id:data.id,
            name: data.name,
            infraestructura_fk: data.infraestructura_fk,
            zona_fk: data.zona_fk,
            posicion: data.posicion,
            activo: data.activo,
        })
        .select()
    .single()
  if (error) throw error
  return puntoMuestreo
}

export const anularPuntoMuestreo = async (id) => {
    const { data, error } = await supabase
        .from('puntos_muestreo')
        .update({ activo: false })
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return data
}

export const updatePuntoMuestreo = async (data) => {
    const { data: puntoMuestreo, error } = await supabase
        .from('puntos_muestreo')
        .update({
            name: data.name,
            infraestructura_fk: data.infraestructura_fk,
            zona_fk: data.zona_fk,
            posicion: data.posicion,
            activo: data.activo,
        })
        .eq('id', data.id)
        .select()
        .single()
    if (error) throw error
    return puntoMuestreo
}