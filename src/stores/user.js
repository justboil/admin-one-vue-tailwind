import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),
  actions: {
    async allUsers() {
      try {
        const response = await axios.get(`/all-users`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async usersSummary(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/users?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    async updateUser(filters, id) {
      try {
        const response = await axios.put(`/user/${id}`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
    async activateDeactivateUser(id) {
      try {
        const response = await axios.put(`/user/${id}/activate-deactivate-user`);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
    async updateUserRole(filters, id) {
      try {
        const response = await axios.post(`/user/${id}/update-role`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
    async createUser(form) {
      try {
        const response = await axios.post(`/create-user`, form);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
    async deleteUser(id) {
      try {
        const response = await axios.delete(`/user/${id}`);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async changeUserPassword(filters, id) {
      try {
        const response = await axios.put(`/user/${id}/change-password`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

