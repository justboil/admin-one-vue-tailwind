import {
  formatDateToSpanish,
  excelDateToJSDate,
  fechaFinal,
  formatDatos,
  codMuestraLab,
} from "../helpers/index";
import { codParametro, codAnalisis, codParametroOperacional } from "../helpers/data";
import useStore from "../stores/index";

export default function useExtractdata() {
  const store = useStore();

  //* Extrae los datos de cada una de las hojas
  const datosBoletin = (sheetsData) => {
    const sheets = Object.values(sheetsData);
    console.log("Hojas: ", sheets);

    //* (Filas) Extraemos las filas necesarias de cada una de las hojas
    const dataVector = [];
    sheets.forEach((sheet) => {
      let fecha = "";
      try {
        fecha = formatDateToSpanish(excelDateToJSDate(sheet[3].__EMPTY_1));
        console.log("FECHA: ", fecha);
      } catch (error) {
        console.error("Error al convertir la fecha:", error);
      }
      //en el caso que sea un analisis de RUTINA
      if (sheet[3].__EMPTY_10) {
        console.log("rutina", sheet[3].__EMPTY_10);

        const codPuntoExtraccion1 = sheet[4].__EMPTY_6;
        const codPuntoExtraccion2 = sheet[4].__EMPTY_12;

        const rows = sheet.slice(8, 24);
        rows.forEach((row, index) => {
          const codAnalisis = "29";
          //* (Filas/2) Extraemos los vectores con los datos necesarios con la fecha a principio de vector, código de análisis y código de punto de extracción
          const data1 = [
            fechaFinal(row.__EMPTY, fecha),
            codAnalisis,
            codPuntoExtraccion1,
            formatDatos(row.__EMPTY_1),
            row.__EMPTY_2 === 0 || row.__EMPTY_2 === 1 ? row.__EMPTY_2 : 1,
            row.__EMPTY_3 === 0 || row.__EMPTY_3 === 1 ? row.__EMPTY_3 : 1,
            row.__EMPTY_4 === 0 || row.__EMPTY_4 === 1 ? row.__EMPTY_4 : 1,
            formatDatos(row.__EMPTY_5),
            formatDatos(row.__EMPTY_6),
          ];
          const data2 = [
            fechaFinal(row.__EMPTY, fecha),
            codAnalisis,
            codPuntoExtraccion2,
            formatDatos(row.__EMPTY_7),
            row.__EMPTY_8 === 0 && row.__EMPTY_8 === 1 ? row.__EMPTY_8 : 1,
            row.__EMPTY_9 == 0 && row.__EMPTY_9 === 1 ? row.__EMPTY_9 : 5,
            row.__EMPTY_10 === 0 && row.__EMPTY_10 === 1 ? row.__EMPTY_10 : 1,
            formatDatos(row.__EMPTY_11),
            formatDatos(row.__EMPTY_12),
          ];

          const insertData = (data) => {
            if ([data[3], data[7], data[8]].some((value) => value !== "")) {
              console.log("DATA: ", data);
              dataVector.push(data);
            }
          };
          insertData(data1);
          insertData(data2);
        });

        // En el caso que sea un analisis de OPERACIONAL
      } else if (sheet[3].__EMPTY_7) {
        const codPuntoExtraccion1 = sheet[4].__EMPTY_3;
        const codPuntoExtraccion2 = sheet[4].__EMPTY_6;
        const codPuntoExtraccion3 = sheet[4].__EMPTY_9;

        const codAnalisis = "28";
        const rows = sheet.slice(7, 23);
        rows.forEach((row, index) => {
          const data1 = [
            fechaFinal(row.__EMPTY, fecha),
            codAnalisis,
            codPuntoExtraccion1,
            formatDatos(row.__EMPTY_1),
            formatDatos(row.__EMPTY_2),
            formatDatos(row.__EMPTY_3),
          ];
          const data2 = [
            fechaFinal(row.__EMPTY, fecha),
            codAnalisis,
            codPuntoExtraccion2,
            formatDatos(row.__EMPTY_4),
            formatDatos(row.__EMPTY_5),
            formatDatos(row.__EMPTY_6),
          ];
          const data3 = [
            fechaFinal(row.__EMPTY, fecha),
            codAnalisis,
            codPuntoExtraccion3,
            formatDatos(row.__EMPTY_7),
            formatDatos(row.__EMPTY_8),
            formatDatos(row.__EMPTY_9),
          ];

          const data_object = {
            fechaFinal: fechaFinal(row.__EMPTY, fecha),
            codAnalisis: codAnalisis,
            codPuntoExtraccion: codPuntoExtraccion1,
            cod1: row.__EMPTY_1,
            cod2: row.__EMPTY_2,
            cod3: row.__EMPTY_3,
          };
          console.log("DATA_OBJECT:", data_object);

          const insertData = (data) => {
            if (
              (data[2],
              [data[3], data[4]].some((value) => value !== "" && !isNaN(value)))
            ) {
              dataVector.push(data);
            }
          };
          insertData(data1);
          insertData(data2);
          insertData(data3);
        });
      } else {
        console.log("no hay nada");
      }
    });
    console.log("DATAVECTOR: ", dataVector);
    store.dataSamples = dataVector;
  };

    
    //* Funcion de busqueda del codigo de analisis y el parametro (devuelve el objeto completo)
  const buscaCodigoParametro = (indice, tipo) => {
    if (tipo === "29") {
      const parametro = codParametro.find(
        (parametro) => parametro.indice === indice
      );
      return parametro
        ? parametro
        : { codigo: "no hay codigo", codigoAnalisis: "no hay codigo" };
    } else if (tipo === "28") {
      const parametro = codParametroOperacional.find(
        (parametro) => parametro.indice === indice
      );
      return parametro
        ? parametro
        : { codigo: "no hay codigo", codigoAnalisis: "no hay codigo" };
    }
  };

  const exportToXML = (data) => {
    const xmlDataBoletin = data
      .map((row) => {
        const fechaLlegada = `${row[0]}`;
        const idLaboratorio = 4053;
        // const codMuestraLab = "LAB002";
        const fechainforme = `${row[0]}`;
        const idTipoAnalisis = `${row[1]}`;
        const idPuntoMuestra = `${row[2]}`;

        const xmlData = row
          .slice(3)
          .map((element, index) => {
            if (element === "") {
              return null;
            } else {
              const idParametro = codParametro[index]
                ? buscaCodigoParametro(index, idTipoAnalisis)?.codigo
                : "no hay codigo";

              const idMetAnalisis = codAnalisis[index]
                ? buscaCodigoParametro(index, idTipoAnalisis)?.codigoAnalisis
                : "no hay codigo";
              const valorCuantif = element;
              const codAnalista = "ANAL001";

              return `<DETERMINACION_BOLETIN>
    <COD_PARAMETRO>${idParametro}</COD_PARAMETRO>
    <ID_MET_ANALISIS>${idMetAnalisis}</ID_MET_ANALISIS>
    ${
      idParametro === "056" || idParametro === "057" || idParametro === "058"
        ? `<VALOR_CUALIF>${valorCuantif}</VALOR_CUALIF>`
        : `<VALOR_CUANTIF>${valorCuantif}</VALOR_CUANTIF>`
    }
    <COD_ANALISTA>${codAnalista}</COD_ANALISTA>
  </DETERMINACION_BOLETIN>`;
            }
          })
          .join("\n");

        return `<!-- BOLETIN_GENERAL para el ${fechainforme} -->
        <BOLETIN_GENERAL>
          <ID_TIPO_ANALISIS>${idTipoAnalisis}</ID_TIPO_ANALISIS>
          <ID_PM>${idPuntoMuestra}</ID_PM>
          <FECHA_TOMA>${fechaLlegada}</FECHA_TOMA>          
          <BOLETINES>
            <BOLETIN>
                <FECHA_LLEGADA_LAB>${fechaLlegada}</FECHA_LLEGADA_LAB>
                <ID_LABORATORIO>${idLaboratorio}</ID_LABORATORIO>
                <COD_MUESTRA_LAB>${codMuestraLab(
                  idPuntoMuestra,
                  fechaLlegada
                )}</COD_MUESTRA_LAB>
                <FECHA_INFORME>${fechainforme}</FECHA_INFORME>
                  <DETERMINACIONES>
                    ${xmlData}
                  </DETERMINACIONES>
              </BOLETIN>
          </BOLETINES>
        </BOLETIN_GENERAL>`;
      })
      .join("\n");

    // const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    //   <BOLETINES_GENERAL>
    //       ${xmlDataBoletin}
    //   </BOLETINES_GENERAL>`;
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<BOLETINES_GENERAL xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="Boletines.xsd">\n${xmlDataBoletin}\n</BOLETINES_GENERAL>`;

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Analitica_Rutina_Operacional.xml`;
    link.click();
  };

  return {
    datosBoletin,
    exportToXML,
  };
}
