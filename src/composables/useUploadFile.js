import useStore from "../stores";
import { ref } from "vue";
import * as XLSX from "xlsx";
import useExtractdata from "./useExtractData";

export default function useUploadFile() {
    const  { datosBoletin} = useExtractdata();


    const store = useStore();

    const sheetsData = ref({});
    const errorMessage = ref("");
  
    //* CARGA DEL ARCHIVO EXCEL
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: "binary" });
  
          //* Obtener las hojas
          // const sheetNames = workbook.SheetNames.slice(0, 3);
          const sheetNames = workbook.SheetNames;
  
          //* Convertir las hojas seleccionadas a JSON
          sheetsData.value = sheetNames.reduce((acc, sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
  
            // Usar sheet_to_json con opciones para manejar hojas vacías
            acc[sheetName] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
            return acc;
          }, {});
  
          datosBoletin(sheetsData.value);
          console.log("SHEETDATA: ", sheetsData);
  
          // Añadir mensaje de depuración
          console.log("Hojas leídas:", Object.keys(sheetsData.value));
          console.log("Object Value:", Object.values(sheetsData.value));
          console.log("Datos de las hojas:", sheetsData.value);
        } catch (error) {
          errorMessage.value = `Error al leer el archivo: ${error.message}`;
          console.error(error);
        }
      };
  
      reader.onerror = (error) => {
        errorMessage.value = `Error al leer el archivo: ${error}`;
        console.error(error);
      };
  
      reader.readAsBinaryString(file);
  };
  

  
















    return {
        handleFileUpload,
        sheetsData,
        errorMessage


    }
}