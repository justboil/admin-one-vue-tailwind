import { supabase } from './supabase'

// const plantaStore= usePlantasStore()

export const getUO = async () => {
  const { data } = await supabase.from('unidades_operativas').select('*')
  return data
}

// export const setOperarios = async (operario) => {
//   const { data } = await supabase.from('personal').insert(operario)
//   return data
// }

// export const setUO = async (uo) => {
//   try {
//     // 1. Insertar unidad operativa y obtener ID
//     const { data: newUO, error: errorUO } = await supabase
//       .from('unidades_operativas')
//       .insert({
//         name: uo.name,
//         description: uo.description,
//       })
//       .select() // Devuelve todos los campos, incluido el ID generado
//       .single() // Devuelve un único registro en lugar de un array

//     if (errorUO) throw errorUO

//     // 2. Preparar zonas con el ID generado
//     const zonasToInsert = uo.zonas.map(zona_id => ({
//       unidades_operativas_fk: newUO.id,
//     }))

//     // 3. Insertar zonas
//     const { data: insertedZonas, error: errorZonas } = await supabase
//       .from('zonas_abastecimiento')
//       .insert(zonasToInsert)
//       .select()

//     if (errorZonas) throw errorZonas

//     return {
//       unidadOperativa: newUO,
//       zonas: insertedZonas
//     }

//   } catch (error) {
//     console.error('Error en setUO:', error)
//     throw error
//   }
// }

export const anularUO = async (id) => {
  console.log(id)
  try {
    const { data, error: errorUO } = await supabase
      .from('unidades_operativas')
      .upsert({ id: id, activo: false }, { onConflict: ['id'] })
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

export const createUO = async (uo) => {
  try {
    const { data } = await supabase
      .from('unidades_operativas')
      .insert({
        name: uo.name,
        description: uo.description
      })
      .select()
    return data
  } catch (error) {
    console.error('Error en createUO:', error)
    throw error
  }
}

// export const setAnaliticas = async (analitica) => {
//   const { data } = await supabase.from('analiticas').insert(analitica)
//   return data
// }



export const updateUO = async (data) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000;

  const tryUpdate = async (retryCount = 0) => {
    try {
      if (!data.id || !data.name || !data.description) {
        throw new Error('Faltan campos requeridos')
      }

      const { data: updateData, error: errorUO } = await supabase
        .from('unidades_operativas')
        .update({
          name: data.name,
          description: data.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id)
        .select()
        .single()

      if (errorUO) throw errorUO

      return updateData

    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Reintento ${retryCount + 1} de ${MAX_RETRIES}`)
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
        return tryUpdate(retryCount + 1)
      }
      throw error
    }
  }

  try {
    return await tryUpdate()
  } catch (error) {
    console.error('Error en updateUO:', error)
    throw new Error(`Error al actualizar UO: ${error.message}`)
  }
}
// export const anularUO = async (id) => {
//   console.log(id)
//   try {
//     const { error: errorUO } = await supabase
//       .from('unidades_operativas')
//       .update({ activo: false })
//       .eq('id', id)
//     if (errorUO) throw errorUO
//   } catch (error) {
//     console.error('Error en anularUO:', error)
//     throw error
//   }
// }
