import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
  }),
  actions: {

    async allRoles() {
      try {
        const response = await axios.get(`/all-roles`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async roles(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/roles?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async viewRole(id) {
      try {
        const response = await axios.get(`/role/${id}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async updateRolePermission(filters,id) {
      try {
        const response = await axios.put(`/roles-permissions/${id}`, filters);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async updateRole(filters,id) {
      try {
        const response = await axios.put(`/role/${id}`, filters);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async deleteRole(id) {
      try {
        const response = await axios.delete(`/role/${id}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async createRole(filters) {
      try {
        const response = await axios.post(`/role`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

