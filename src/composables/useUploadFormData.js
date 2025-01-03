// import {
//   formatDateToSpanish,
//   excelDateToJSDate,
//   fechaFinal,
//   formatDatos,
//   codMuestraLab,
// } from "../helpers/index";
// import { codParametro, codAnalisis, codParametroOperacional } from "../helpers/data";
// import useStore from "../stores/index";

import { formatDate } from "@/helpers"

export default function useExtractdata() {
  // const store = useStore();

  
  
    const exportXMLData = (analiticas) => {
      const xmlBoletines = analiticas.map(analitica => {
        const determinaciones = []
        const COD_ANALISTA = "ANAL001"
        const ID_LABORATORIO = '4053'
        const fechaFormateada= formatDate(analitica.fecha)
  
        // Añadir determinaciones según los valores presentes
        if (analitica.cloro !== null) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>045</COD_PARAMETRO>
              <ID_MET_ANALISIS>50680</ID_MET_ANALISIS>
              <VALOR_CUANTIF>${analitica.cloro}</VALOR_CUANTIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        if (analitica.ph !== null) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>051</COD_PARAMETRO>
              <ID_MET_ANALISIS>50678</ID_MET_ANALISIS>
              <VALOR_CUANTIF>${analitica.ph}</VALOR_CUANTIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        if (analitica.turbidez !== null) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>054</COD_PARAMETRO>
              <ID_MET_ANALISIS>50679</ID_MET_ANALISIS>
              <VALOR_CUANTIF>${analitica.turbidez}</VALOR_CUANTIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        // Valores cualitativos
        if (analitica.olor) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>057</COD_PARAMETRO>
              <ID_MET_ANALISIS>50960</ID_MET_ANALISIS>
              <VALOR_CUALIF>${analitica.olor}</VALOR_CUALIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        if (analitica.color) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>056</COD_PARAMETRO>
              <ID_MET_ANALISIS>50962</ID_MET_ANALISIS>
              <VALOR_CUALIF>${analitica.color}</VALOR_CUALIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        if (analitica.sabor) {
          determinaciones.push(`
            <DETERMINACION_BOLETIN>
              <COD_PARAMETRO>058</COD_PARAMETRO>
              <ID_MET_ANALISIS>50961</ID_MET_ANALISIS>
              <VALOR_CUALIF>${analitica.sabor}</VALOR_CUALIF>
              <COD_ANALISTA>${COD_ANALISTA}</COD_ANALISTA>
            </DETERMINACION_BOLETIN>
          `)
        }
  
        return `<!-- BOLETIN_GENERAL para el ${analitica.fecha} -->
          <BOLETIN_GENERAL>
            <ID_TIPO_ANALISIS>${analitica.type}</ID_TIPO_ANALISIS>
            <ID_PM>${analitica.punto_muestreo_fk}</ID_PM>
            <FECHA_TOMA>${fechaFormateada}</FECHA_TOMA>          
            <BOLETINES>
              <BOLETIN>
                <FECHA_LLEGADA_LAB>${fechaFormateada}</FECHA_LLEGADA_LAB>
                <ID_LABORATORIO>${ID_LABORATORIO}</ID_LABORATORIO>
                <COD_MUESTRA_LAB>M${analitica.punto_muestreo_fk}${analitica.fecha.replace(/[^0-9]/g, '')}</COD_MUESTRA_LAB>
                <FECHA_INFORME>${fechaFormateada}</FECHA_INFORME>
                <DETERMINACIONES>
                  ${determinaciones.join('\n')}
                </DETERMINACIONES>
              </BOLETIN>
            </BOLETINES>
          </BOLETIN_GENERAL>
        `
      }).join('\n')
  
      // return `<?xml version="1.0" encoding="UTF-8"?>
      //   <BOLETINES_GENERALES>
      //     ${xmlBoletines}
      //   </BOLETINES_GENERALES>`
      
        return`<?xml version="1.0" encoding="UTF-8"?>\n<BOLETINES_GENERAL xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="Boletines.xsd">\n${xmlBoletines}\n</BOLETINES_GENERAL>`;
    }
  
    
  
  
          
          
    
    


  return {
    exportXMLData
  };
}
