// Importamos de la librería xlsx
import { utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

import { getCursoOrderByMateria } from '../../../api/Cursos/Cursos'
import { useEffect, useState } from 'react';



function ExcelComponente() {
    const [isLoading, setIsLoading] = useState(false)
    const [listaCursosOrdenadosPorMateria, setListaCursosOrdenadosPorMateria] = useState([])
    useEffect(() => {
        const cursosOrdenadosPorMateria = async () => {
            const response = await getCursoOrderByMateria()
            setListaCursosOrdenadosPorMateria(response)
        }
        cursosOrdenadosPorMateria()
    })
    let cursosPorMateria: any = []

    const rellenarExcel = async () => {

    for ( const curso of listaCursosOrdenadosPorMateria){
     cursosPorMateria.push({
        // @ts-ignore
        curso: curso.nombre,
        // @ts-ignore
        materia: curso.materia,
    })  
    }
    }

    const exportarExcel = async () => {
        setIsLoading(true);
        // Rellenar las denuncias
        await rellenarExcel();
    
        // Crear una hoja de cálculo a partir de los datos de las denuncias
        const hoja = XLSX.utils.json_to_sheet(cursosPorMateria);
    
        // Modificar celdas para que se vean mejor al visualizar los datos
        hoja['!cols'] = [
          { wch: 20 }, //id A1
          { wch: 20 }, // Fecha B1
     
        ];
        hoja['A1'] = { v: 'Nombre', t: 's' };
        hoja['B1'] = { v: 'Materia', t: 's' };

        // Crear un libro de trabajo y agregar la hoja de cálculo
        const libro = utils.book_new();
        utils.book_append_sheet(libro, hoja, 'Cursos');
        // Escribir el libro de trabajo a un archivo Excel
        setIsLoading(false);
    
        writeFile(libro, 'Cursos.xlsx');
    
      };
      
      return (<>
            {isLoading ? <p>Generando archivo...</p> : 
            <button onClick={() => exportarExcel()} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Cursos por materia</button>                
            }
            </>
      );




}

export default ExcelComponente