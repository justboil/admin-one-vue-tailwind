import { createClient } from "@supabase/supabase-js";
// import {corsHeaders} from '../helpers/cors'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 
// const isModalDeleteActive = ref(false)
// const analiticaToDelete = ref(null)

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Client-Info, X-Client-Proto, X-Client-Version, X-Requested-With, Content-Type, Accept, Authorization',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  },
  // db: {
  //   schema: {
  //     defaultHTTPMethod: 'PUT'  // Force PUT instead of PATCH for updates
  //   }
  // }
});


export const searchOperarios = async () => {
  const { data } = await supabase.from('personal').select('*')
  return data
}
export const searchZonasOperarios = async (id) => {
  const { data } = await supabase.from('personal').select(`id,zonas_personal(zonas_abastecimiento(*))`).eq('id',id)
  return data
}

// export const deleteAnalitica = async (analitica) => {
//   analiticaToDelete.value = analitica
//   isModalDeleteActive.value = true
// }




export const deleteAnalitica = async (id) => {
  const { error } = await supabase
      .from('analiticas')
      .delete()
      .eq('id', id)

     if (error) throw error
}

export const updateAnaliticabyId = async (id, data) => {
  try {
    console.log('updateAnaliticabyId: ',id, data);
    // Limpiar datos antes de actualizar
    const cleanData = {
      id: data.id,
      fecha: data.fecha,
      personal_fk: data.personal_fk,
      punto_muestreo_fk: data.punto_muestreo_fk,
      type: data.type,
      cloro: data.cloro,
      color: data.color,
      olor: data.olor,
      sabor: data.sabor,
      ph: data.ph,
      turbidez: data.turbidez,
      observaciones: data.observaciones,
      registro: data.registro,
      zona_fk: data.zona_fk
    }
    const { data: updateData, error } = await supabase
      .from('analiticas')
      .update(cleanData)
      .eq('id', id)
      .select()

    if (error) throw error

    return updateData
  } catch (error) {
    console.error('Error en updateAnaliticabyId:', error)
    throw error
  }

 
}
// export const deleteAnalitica = async (id) => {
//   const { data, error } = await supabase
//   .from('analiticas')
//   .delete()
//   .eq('id', id)
//   if (error) throw error
//   return data
// }
