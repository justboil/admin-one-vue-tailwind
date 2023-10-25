import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  state: () => ({
    statuses: [],
  }),
  actions: {
    async statuses(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/statuses?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

