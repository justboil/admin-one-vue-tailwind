import { defineStore } from 'pinia'
import DashboardService from '@/services/dashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboard: {},
  }),
  actions: {
    get() {
        DashboardService
        .getDashboard()
        .then(r => {
          if (r.data) {
            this.dashboard = r.data
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
})
