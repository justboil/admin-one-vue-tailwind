import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("dataStore", () => {

  const dataSamples = ref([]);
  const user= ref(null);
  
  



    return {
      dataSamples,
      user,
      
        




  };
});

export default useStore;

