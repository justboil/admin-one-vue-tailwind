import { defineStore } from 'pinia'
import { getCurrentUser , getCountSendToday ,getCountReceiveToday , getCountBitToday , getCountDebt , getCountMember } from '@/utils'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    currentUser : getCurrentUser(),
    countSendToday : getCountSendToday(),
    countReceiveToday : getCountReceiveToday(),
    countBitToday : getCountBitToday(),
    countDebt : getCountDebt(),
    countMember : getCountMember(),
    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: []
  }),
  actions: {
    setUser (payload) {
      this.currentUser = payload
    },
    setCountSendToday(count){
      this.countSendToday = count
    },
    setCountReceiveToday(count){
      this.countReceiveToday = count
    },
    setCountBitToday(count){
      this.countBitToday = count
    },
    setCountDebt(count){
      this.countDebt = count
    },
    setCountMember(count){
      this.countMember = count
    },
    fetch (sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then(r => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
})
