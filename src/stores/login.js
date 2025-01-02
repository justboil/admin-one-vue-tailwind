import { set } from "date-fns";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLoginStore = defineStore("loginStore", () => {

    const user = ref(null);
    const isAuthenticated = ref(false);

    const userName = ref('')
    const userEmail = ref('')



    const userAvatar = computed(
        () =>
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
            /[^a-z0-9]+/gi,
            '-'
          )}`
    )
    
    function setUser(payload) {
        if (payload.name) {
          userName.value = payload.name
        }
        if (payload.username) {
          userEmail.value = payload.username
        }
      }
  
  

    
    const setAccount = (account) => {   
        user.value = account;
    }
    
    const setIsAuthenticated = (valor) => {
        isAuthenticated.value = valor;
    }

    return {
        user,
        isAuthenticated,
        setIsAuthenticated,
        setAccount,
        userAvatar,
        setUser,
        userName,
        userEmail,
      
        




  };
});

export default useLoginStore;

