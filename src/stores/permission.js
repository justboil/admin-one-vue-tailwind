import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    permissions: [],
  }),
  actions: {
    async permissions(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/permissions?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async viewPermission(id) {
      try {
        const response = await axios.get(`/permission/${id}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async createPermission(filters) {
      try {
        const response = await axios.post(`/permission`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

