import { usePlantasStore } from "@/stores/plantas";
const plantaStore = usePlantasStore()
import L from 'leaflet'


export const getTipoInfrastructuraByPunto = (infraId) => {
    const infraestructura = plantaStore.getInfraestructuras.find((infra) => infra.id === infraId)?.type
    console.log(infraestructura);
    return infraestructura
  }
  
export const getIconByInfraestructura = (infId) => {
    switch (getTipoInfrastructuraByPunto(infId)) {
      case 1:
        return 'faucet'
      case 2:
        return 'ring'
      case 3:
        return 'flask'
      case 4:
        return 'route'
        default:
        return 'water'
    }
}

