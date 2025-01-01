import { set } from "date-fns";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("loginStore", () => {

    const user = ref(null);
    const isAuthenticated = ref(false);
  
  

    
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
      
        




  };
});

export default useLoginStore;

