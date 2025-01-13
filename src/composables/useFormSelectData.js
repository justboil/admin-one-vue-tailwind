import { computed, reactive, watch } from 'vue'
import { usePlantasStore } from '@/stores/plantas'
import { useLoginStore } from '@/stores/login'

export default function useFormSelectData() {
  const loginStore = useLoginStore()
  const plantasStore = usePlantasStore()


  const findOperarioByUser = (usuarioMail) => {
    console.log(usuarioMail);
    // Verificar que existe el store y los datos
    if (!plantasStore?.getOperarios) return 'HOLA'

    const operario = plantasStore.getOperarios.find(
      (user) => user.email === usuarioMail
    )
    console.log('Operario:', operario);
    
    return operario ? operario.id : null
  }

//   const operarioLogueado = computed(() => {
//     if (loginStore.userEmail) { // Check if userEmail is not null or undefined
//       const operario = plantasStore.getOperarios.find(
//         op => op.email.toLowerCase() === loginStore.userEmail.toLowerCase()
//       )
//       return operario ? operario : null
//     }
// else {
//   return null
// }
  // })
  const operarioLogueado = computed(() => {
    // Verificar si existe userEmail y plantasStore
    if (!loginStore?.userEmail || !plantasStore?.getOperarios) {
      console.warn('No hay email de usuario o no hay operarios')
      return null
    }
  
    const operario = plantasStore.getOperarios.find(op => {
      // Validar que op.email existe
      if (!op?.email) return false
      return op.email.toLowerCase() === loginStore.userEmail.toLowerCase()
    })
  
    return operario || null
  })


  // Obtener fecha actual en formato AAAA-MM-DD
  const today = new Date().toISOString().split('T')[0]

  

  const form = reactive({
    uo: '',
    zona: null,
    punto_muestreo_fk: null,
    fecha:today,
    color: 1,
    olor: 1,
    sabor: 1,
    cloro: '',
    type: '',
    observaciones: '',
    ph: null,
    turbidez: null,
    operario: '',
      infraestructura: null,
      fecha_inicio: null,
    fecha_final:null,

  })

  watch(
    () => plantasStore.getOperarios,
    () => {
      if (operarioLogueado.value) {
        // form.operario = operarioLogueado.value.id
        // form.uo = operarioLogueado.value.ud_operativa_fk
      }
    },
    { immediate: true }
  )

  

  const resetForm=()=>{
    Object.keys(form).forEach((key) => {
      form[key] = null
    })
  }
  const selectUO = computed(() => {
    return plantasStore.getUnidadesOperativas.map((uo) => {
      return { value: uo.id, label: uo.name }
    })
  })
  const selectZona = computed(() => {
    if (!form.uo) return plantasStore.getZonas.map((zona) => {
      return { value: zona.id, label: zona.name }
    })
    return plantasStore.getZonas
      .filter((zona) => zona.unidades_operativas_fk === form.uo)
      .map((zona) => {
        return { value: zona.id, label: zona.name }
      })
  })

  const selectInfraestructura = computed(() => {
    if (!form.zona) return plantasStore.getInfraestructuras.map((infraestructura) => { return { value: infraestructura.id, label: infraestructura.name } })
    const infraestructuras = plantasStore.getZonasInfraestructuras
      .filter((infraestructura) => infraestructura.zonas_fk === form.zona)
      .map((infraestructura) => {
        // console.log(':Infraestructura: ',infraestructura)
        return {
          value: infraestructura.infraestructuras_fk,
          label: buscaInfraestructuraPorId(infraestructura.infraestructuras_fk)
        }
      })
    return infraestructuras
  })

  const buscaInfraestructuraPorId = (id) => {
    const infraestructura = plantasStore.getInfraestructuras.find(
      (infraestructura) => infraestructura.id === id
    )
    if (infraestructura) {
      return infraestructura.name
    } else {
      return ''
    }
  }

  const selectPuntosMuestra = computed(() => {
    if (!form.infraestructura) return plantasStore.getPuntosMuestreo.map((punto) => {return { value: punto.id, label: punto.name }})
    return plantasStore.getPuntosMuestreo
      .filter((punto) => punto.infraestructura_fk === form.infraestructura)
      .map((punto) => {
        return { value: punto.id, label: punto.name }
      })
  })

  // const selectPunto = computed(() => {
  //   if (!form.zona) return []
  //   return plantasStore.getPuntosMuestreo
  //     .filter((punto) => punto.zonas_abastecimiento_fk === form.zona)
  //     .map((punto) => {
  //       return { value: punto.id, label: punto.name }
  //     })
  // })

  const operarioPorZona = computed(() => {
    if (!form.uo) return plantasStore.getOperarios.map((operario) => {return { value: operario.id, label: operario.name }})
    return plantasStore.getOperarios
      .filter((operario) => operario.ud_operativa_fk === form.uo)
      .map((operario) => {
        return { value: operario.id, label: operario.name }
      })
  })



  return {
    resetForm,
    form,
    selectUO,
    selectZona,
    selectInfraestructura,
    selectPuntosMuestra,
    operarioPorZona, 
    findOperarioByUser,
    operarioLogueado
  }
}
