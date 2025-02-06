import { supabase } from './supabase'

export const createZona = async (zona) => {
  try {
    const { data } = await supabase
      .from('zonas_abastecimiento')
      .insert({
        id: zona.id,
        name: zona.name,
        com_autonoma_fk: zona.com_autonoma_fk,
        unidades_operativas_fk: zona.unidades_operativas_fk
      })
      .select()
      .single()

    return data
  } catch (error) {
    console.error('Error en setZona:', error)
    throw error
  }
}

export const anularZona = async (id) => {
    console.log('ID: ',id)
    try {
      const { data, error: errorUO } = await supabase
        .from('zonas_abastecimiento')
        .upsert({ id: id, activa: false }, { onConflict: ['id'] })
        .select()
  
      if (errorUO) {
        console.error('Error SQL:', errorUO)
        throw errorUO
      }
      return data
    } catch (error) {
      console.error('Error en anularUO:', error)
      throw error
    }
  }
