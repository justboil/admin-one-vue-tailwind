import axios from '../plugins/axios';
import axiosMultipart from '../plugins/axiosMultipart';
import { defineStore } from "pinia";

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [],
  }),
  actions: {
    objectToQueryParams(obj) {
      const queryParams = [];

      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((value) => {
            const newKey = key +"[]";
            queryParams.push(`${newKey}=${value}`);
          });
        } else {
          queryParams.push(`${key}=${obj[key]}`);
        }
      }

      return queryParams.join("&");
    },

    async allProjects() {
      try {
        const response = await axios.get(`/all-projects`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async viewProject(id) {
      try {
        const response = await axios.get(`/project/${id}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async projectsSummary(filters) {
      try {
        const response = await axios.get(`/projects-summary?${this.objectToQueryParams(filters)}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async projectNames(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/project-names?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async projects(filters) {
      try {
        const queryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        const response = await axios.get(`/projects?${queryString}`);
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async updateProject(filters, id) {
      try {
        const response = await axios.put(`/project/${id}`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async createProject(form) {
      try {
        const response = await axios.post(`/project`, form);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async deleteProject(id) {
      try {
        const response = await axios.delete(`/project/${id}`);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async addCommentToProject(filters, id) {
      try {
        const response = await axiosMultipart.post(`/project/${id}/add-comment`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },

    async addMemberToProject(filters) {
      //filters {project_id, user_id, created_by}
      try {
        const response = await axios.post(`/project/member`, filters);
        return response;
      } catch (error) {
        return error.response.data;
      }
    },
  },
});

