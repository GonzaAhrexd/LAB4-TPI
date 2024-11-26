// Importamos de la librería xlsx
import { utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

import { getComisionesExcel } from '../../../api/Comisiones/Comisiones'
import { useEffect, useState } from 'react';

type ExcelProps = {
    sortByProfesor?: boolean
}

function ExcelComponente({sortByProfesor}: ExcelProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [listaComisiones, setListaComisiones] = useState([])
    useEffect(() => {
        const comisiones = async () => {
            const response = await getComisionesExcel()
            setListaComisiones(response)
        }
        comisiones()
    })
    let comisionesMostrar: any = []

    const rellenarExcel = async () => {
    if(!sortByProfesor){
    for ( const comision of listaComisiones){
        comisionesMostrar.push({
        // @ts-ignore
        aula: comision.aula,
        // @ts-ignore
        horario: comision.horario,
        // @ts-ignore
        curso: comision.curso,
        // @ts-ignore
        profesor: comision.profesor,
    })  
    }
}else{
    for(const comision of listaComisiones){
        comisionesMostrar.push({
            // @ts-ignore
            profesor: comision.profesor,
            // @ts-ignore
            aula: comision.aula,
            // @ts-ignore
            horario: comision.horario,
            // @ts-ignore
            curso: comision.curso,
        })
    }
}

    
    
}
// Ordena las comisiones por profesor
    const comisionesPorProfesor = comisionesMostrar.sort((a: any, b: any) => {
        if (a.profesor < b.profesor) {
          return -1;
        }
        if (a.profesor > b.profesor) {
          return 1;
        }
        return 0;
      });



    const exportarExcel = async () => {
        setIsLoading(true);
        // Rellenar las denuncias
        await rellenarExcel();
    
        // Crear una hoja de cálculo a partir de los datos de las denuncias
        const hoja = XLSX.utils.json_to_sheet(comisionesMostrar);
        const hoja2 = XLSX.utils.json_to_sheet(comisionesPorProfesor);
        // Modificar celdas para que se vean mejor al visualizar los datos
        hoja['!cols'] = [
          { wch: 20 }, // A1
          { wch: 20 }, // B1
          { wch: 20 }, // B1
          { wch: 20 }, // B1

        ];
        hoja['A1'] = { v: 'Aula', t: 's' };
        hoja['B1'] = { v: 'Horario', t: 's' };
        hoja['C1'] = { v: 'Curso', t: 's' };
        hoja['D1'] = { v: 'Profesor', t: 's' };

        
        hoja2['A1'] = { v: 'Profesor', t: 's' };
        hoja2['B1'] = { v: 'Aula', t: 's' };
        hoja2['C1'] = { v: 'Horario', t: 's' };
        hoja2['D1'] = { v: 'Curso', t: 's' };

        // Crear un libro de trabajo y agregar la hoja de cálculo
        const libro = utils.book_new();
        if(!sortByProfesor){

        utils.book_append_sheet(libro, hoja, 'Comisiones');
        // Escribir el libro de trabajo a un archivo Excel
        setIsLoading(false);
    
        writeFile(libro, 'Comisiones.xlsx');
        }else{
            utils.book_append_sheet(libro, hoja2, 'Comisiones');
            // Escribir el libro de trabajo a un archivo Excel
            setIsLoading(false);
        
            writeFile(libro, 'Profesores.xlsx');
        }
      };
      
      return (<>
            {isLoading ? <p>Generando archivo...</p> : 
            <button onClick={() => exportarExcel()} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>{sortByProfesor ? "Profesores" : "Comisiones"}</button>                
            }
            </>
      );




}

export default ExcelComponente