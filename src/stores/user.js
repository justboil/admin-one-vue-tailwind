import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
    recommendations: [],
    studyMembers: []
  }),
  persist: {
    storage: localStorage
  },
  actions: {
    setUser(payload) {
      this.userInfo = payload;
    },
    fetch(type, payload) {
      if (type === "mockRecommend") {
        this.recommendations = payload;
      }
      if (type === "currentMembers") {
        this.studyMembers = payload;
      }
    }
  }
});

