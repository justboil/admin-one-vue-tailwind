import { supabase } from './supabase'

export const getAnaliticas = async() => {
    const { data } = await supabase.from('analiticas').select('*')
      return data
    }

    export const setAnaliticas = async(analitica) => {
      const { data } = await supabase.from('analiticas').insert(analitica)
      return data
    }
