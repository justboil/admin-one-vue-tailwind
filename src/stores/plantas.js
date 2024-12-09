import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/helpers/supabase";


export const usePlantasStore = defineStore("plantasStore", () => {

    const plantas = ref([]);
    const operarios = ref([]);


    const getPlantas = async () => {
        const { data } = await supabase.from('plantas').select('*');
        plantas.value = data;
        console.log(operarios);
    }
    const getOperarios = async () => {
        const { data } = await supabase.from('operarios').select('*');
        operarios.value = data;
        console.log(plantas);
    }

    return {
        getPlantas,
        getOperarios,
        plantas,
        operarios
    }
});