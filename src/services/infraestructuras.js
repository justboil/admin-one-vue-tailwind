import { supabase } from "./supabase";


export const createInfraestructura = async (infraestructura) => {
  try {
    const { data } = await supabase
      .from('infraestructuras')
      .insert({
        id: infraestructura.id,
        name: infraestructura.name,
        type: infraestructura.tipo_infraestructura_fk,
        operador: infraestructura.operador
      })
      .select()
      .single()

    return data
  } catch (error) {
    console.error('Error en setZona:', error)
    throw error
  }
}   

export const anularInfraestructura = async (id) => {
    try {
    const { data } = await supabase
    .from('infraestructuras')
    .update({ activo: false })
    .eq('id', id)
    .single()

    return data
} catch (error) {
    console.error('Error en anularInfraestructura:', error)
    throw error
}

}

export const updateInfraestructura = async (id) => {
    console.log(id);
    try {
        const { data } = await supabase
            .from('infraestructuras')
            .update({
                name: id.name,
                type: id.type,
                operador: id.operador })
            .eq('id', id.id)
            .single()

        return data

    } catch (error) {
        console.error('Error al Actualizar la Infraestructura:', error)
        alert('Error al Actualizar la Infraestructura:', error)
        throw error
    }
}