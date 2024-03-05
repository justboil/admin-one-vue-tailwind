export default [
    {
      name: 'global_graph', 
      title: "Global Graph",           
      content: `la idea d'aquest Graph és que sigui el principal data visualization graph del CRM. <br>
                We either do it with d3 or plain SVG. Els de la plantilla estan fets amb SVG and they look good. <br><br>

                <b>DATA:</b> <br>
                X axis: <br>
                · Timeline (hability to set the range in days, weeks, months, custom.) <br>
                Y axis: <br>
                · [TRANSACTIONS] earnings / expenses // tot separat per categories (nòmina, compra menor, despeses de gestió) <br>
                · [WORKTIME] hores dedicades. Possiblitat de filtrar per usuari, categoria, projecte... <br>
                <b>CHALLENGES:</b> <br>
                · It needs <b>thorough filters</b>. Es poden fer amb d3 però hem de research the fuck out of it`,
    },
    {
        name: 'global_earnings',            
        title: "Global Earnings",
        content: `Widget informatiu bàsic amb informació general de Ingressos. <br>
                  Idealment hauria de mostrar dades de l'últim mes / trimestre / semestre. <br><br>

                  <b>DATA:</b><br>
                  · [TRANSACTIONS] only earnings. <br>
                  
                  <b>CHALLENGES:</b> <br>
                  · Les subvencions s'han de distribuïr al llarg de la vida del projecte, no té sentit que de cop en un mes tinguis una entrada loca de diners. <br> 
                  `,
    },
    {
      name: 'global_expenses',            
      title: "Global Expenses",
      content: `Widget informatiu bàsic amb informació general de Despeses. <br>
                Idealment hauria de mostrar dades de l'últim mes / trimestre / semestre. <br><br>

                <b>DATA:</b><br>
                · [TRANSACTIONS] only expenses. <br>
                
                <b>CHALLENGES:</b> <br>
                ·  <br> 
                `,
    },
    {
      name: 'landing_list',            
      title: "Llista 3-5 ítems",
      content: `El propòsit d'aquesta View és aportar informació resumida dels diferents ítems que composen
                la categoria en qüestió. <br>
                En aquesta llista inicial haurien d'aparèixer els 3-5 elements recents/preferits de la categoria corresponent. <br>


                <b>DATA:</b><br>
                · [USERS, PROJECTS, MEETINGS, ETC...] 3-5 elements of the corresponding category. <br>
                
                <b>CHALLENGES:</b> <br>
                ·  Potser estaria bé tenir un configuration object or table or something que guardi les preferències de
                l'usuari en relació a diferents cosetes. Per exemple, potser l'usuari prefereix veure 3 leads on top, o 4 entitats,
                o 3 projectes, o 5 tasques... dunno. Igual store this in the db would be cool.<br> 
                `
                ,
    },
  ]
  