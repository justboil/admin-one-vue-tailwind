import { supabase } from './supabase'

export const getOperarios = async () => {
  const { data } = await supabase.from('personal').select('*')
  return data
}

// export const setOperarios = async (operario) => {
//   const { data } = await supabase.from('personal').insert(operario)
//   return data
// }

export const setOperarios = async (operario) => {
  try {
    // 1. Insertar operario y obtener ID
    const { data: newOperario, error: errorOperario } = await supabase
      .from('personal')
      .insert({
        name: operario.name,
        email: operario.email,
        phone: operario.phone,
        ud_operativa_fk: operario.ud_operativa_fk,
        type: operario.type
      })
      .select() // Devuelve todos los campos, incluido el ID generado
      .single() // Devuelve un único registro en lugar de un array

    if (errorOperario) throw errorOperario

    // 2. Preparar zonas con el ID generado
    const zonasToInsert = operario.zonas.map(zona_fk => ({
      personal_fk: newOperario.id,
      zonas_fk: zona_fk
    }))

    // 3. Insertar zonas
    const { data: insertedZonas, error: errorZonas } = await supabase
      .from('zonas_personal')
      .insert(zonasToInsert)
      .select()

    if (errorZonas) throw errorZonas

    return {
      operario: newOperario,
      zonas: insertedZonas
    }

  } catch (error) {
    console.error('Error en setOperarios:', error)
    throw error
  }
}

// export const deleteOperario = async (id) => {
//   const { error } = await supabase.from('personal').delete().eq('id', id)

//   if (error) throw error
// }

export const deleteOperario = async (id) => {
  try {
    // 1. Primero borrar registros en zonas_personal
    const { error: errorZonas } = await supabase
      .from('zonas_personal')
      .delete()
      .eq('personal_fk', id)

    if (errorZonas) throw errorZonas

    // 2. Luego borrar el operario
    const { error: errorOperario } = await supabase
      .from('personal')
      .delete()
      .eq('id', id)

    if (errorOperario) throw errorOperario

    return true

  } catch (error) {
    console.error('Error al eliminar operario:', error)
    throw error
  }
}


export const updateOperariobyId = async (data) => {
  try {
    // console.log('updateOperariobyId: ',id, data);
    // 1. Limpiar datos del operario
    const cleanDataOperario = {
      // id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      ud_operativa_fk: data.ud_operativa_fk,
      type: data.type
    }
    // 2. Actualizar datos del operario
    const { data: updateDataOperario, errorOperario } = await supabase
      .from('personal')
      .update(cleanDataOperario)
      .eq('id', data.id)
      .select()

    if (errorOperario) throw errorOperario

    console.log('UpdateDataOperario: ', updateDataOperario)

    // 3. Limpiar datos de las zonas del operario
    const { error: errorDelete } = await supabase
      .from('zonas_personal')
      .delete()
      .eq('personal_fk', data.id)

    if (errorDelete) throw errorDelete

    // 4. Preparar nuevas zonas
    const zonasToInsert = data.zonas.map((zona_fk) => ({
      personal_fk: data.id,
      zonas_fk: zona_fk
    }))

    // 5. Insertar nuevas zonas
    const { data: insertedZonas, error: errorInsert } = await supabase
      .from('zonas_personal')
      .insert(zonasToInsert)
      .select()

    if (errorInsert) throw errorInsert

    return {
      operario: updateDataOperario,
      zonas: insertedZonas
    }
  } catch (error) {
    console.error('Error en updateOperariobyId:', error)
    throw error
  }
}
