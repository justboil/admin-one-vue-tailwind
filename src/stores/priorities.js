import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const usePriorityStore = defineStore("priority", {
  state: () => ({
    priorities: [],
  }),
  actions: {
    async priorities(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/priorities?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

