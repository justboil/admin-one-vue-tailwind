import { darkModeKey, styleKey } from '@/config';
import axios from '../plugins/axios';
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userName: null,
    userEmail: null,
    userAvatar: null,

    token: null,
    userId: null,
    roleId: null,
    roleName: null,
    permissions: [],
  }),
  actions: {
    async login({ email, password }) {
      try {
        const response = await axios.post('/login', { email, password });
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('roleId', user.role_id);
        localStorage.setItem('roleName', user.role);
        localStorage.setItem('permissions', JSON.stringify(user.permissions));

        return true;
      } catch (error) {
        return error.response.data;
      }
    },
    async logout() {
      try {
        const response = await axios.post('/logout', null);
        console.log('response')
      } catch (error) {
        console.log(error.response.data.message)
      }

      const darkMode = localStorage.getItem(darkModeKey);
      const style = localStorage.getItem(styleKey);

      const keysToPreserve = [darkModeKey, styleKey];
      Object.keys({}).forEach(key => {
        if (!keysToPreserve.includes(key)) {
          delete state[key];
        }
      });
      localStorage.clear();

      if (style !== null) {
        localStorage.setItem(styleKey, style);
      }
      if (darkMode !== null) {
        localStorage.setItem(darkModeKey, darkMode);
      } else {
        localStorage.setItem(darkModeKey, style === null || style === 'white' ? 0 : 1);
      }
    },
    async resetState() {
      const darkMode = localStorage.getItem(darkModeKey);
      const style = localStorage.getItem(styleKey);

      const keysToPreserve = [darkModeKey, styleKey];
      Object.keys({}).forEach(key => {
        if (!keysToPreserve.includes(key)) {
          delete state[key];
        }
      });
      localStorage.clear();

      if (style !== null) {
        localStorage.setItem(styleKey, style);
      }
      if (darkMode !== null) {
        localStorage.setItem(darkModeKey, darkMode);
      } else {
        localStorage.setItem(darkModeKey, style === null || style === 'white' ? 0 : 1);
      }
    },
  },
});

