import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

export const supabase = createClient(supabaseUrl, supabaseKey);


export const searchOperarios = async () => {
  const { data } = await supabase.from('personal').select('*')
  return data
}
export const searchZonasOperarios = async (nombre) => {
  const { data } = await supabase.from('personal').select(`name,zonas_personal(zonas_abastecimiento(*))`).eq('name',nombre)
  // const { data } = await supabase.from('zonas_abastecimiento').select(`name,zonas_personal(personal_fk,personal(name))`)
  // console.log('SearchZonasOperarios: ',data);
  return data
}
