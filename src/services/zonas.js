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
      const { data, error: errorZona } = await supabase
        .from('zonas_abastecimiento')
        .upsert({ id: id, activa: false }, { onConflict: ['id'] })
        .select()
  
      if (errorZona) {
        console.error('Error SQL:', errorZona)
        throw errorZona
      }
      return data
    } catch (error) {
      console.error('Error en anularUO:', error)
      throw error
    }
}
  
export const updateZona = async (data) => {
    try {
        const { data: updatedData, error: errorZona } = await supabase
        .from('zonas_abastecimiento')
            .update({
            // id:data.id,
            name: data.name,
            com_autonoma_fk: data.com_autonoma_fk,
            unidades_operativas_fk: data.unidades_operativas_fk
        })
        .eq('id', data.id)
        .select()
            .single()
        
        if (errorZona) {
            console.error('Error SQL:', errorZona)
            throw errorZona
        }
        return updatedData
    } catch(error) {
        console.log('Error en updateZona:', error)
    }
}
