import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDateToSpanish = (date) => {
  return format(new Date(date), "/MM/yyyy", { locale: es });
};

export const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;

  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;

  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const fechaFinal = (dia, fecha) => {
  return `${dia.toString().padStart(2, "0")}${fecha}`;
};

export const formatDatos = (data) => {
  if (data === '') {
    return '';
  } 
  else {
    return parseFloat(data).toFixed(1);
  }
  // return parseFloat(data).toFixed(1);

};

//*Genera el código de la muestra de laboratorio
export const codMuestraLab = ((puntMuestra, fecha) => { 
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const random= Math.random().toString().slice(2, 6);//genera un numero aleatorio de 4 cifras
  
return `LAB${year}${month}${day}${puntMuestra}_${fecha}${random}`
.split('/')[0]
 });
