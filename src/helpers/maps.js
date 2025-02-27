import { usePlantasStore } from "@/stores/plantas";
const plantaStore = usePlantasStore()


export const getTipoInfrastructuraByPunto = (infraId) => {
    const infraestructura = plantaStore.getInfraestructuras.find((infra) => infra.id === infraId)?.type
    return infraestructura
  }
  
export const getIconByInfraestructura = (infId) => {
    switch (getTipoInfrastructuraByPunto(infId)) {
      case 1:
        return 'water'
        // return 'faucet'
      case 2:
        return 'ring'
      case 3:
        return 'flask'
      case 4:
        return 'route'
        default:
        return 'faucet'
    }
}

