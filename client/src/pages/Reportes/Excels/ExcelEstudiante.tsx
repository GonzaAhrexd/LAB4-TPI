// Importamos de la librería xlsx
import { utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

import {getEstudiantesWithInscripciones} from '../../../api/Estudiantes/Estudiantes'
import { useEffect, useState } from 'react';



function ExcelComponente() {
    const [isLoading, setIsLoading] = useState(false)
    const [listaEstudiantesConInscripciones, setListaEstudiantesConInscripciones] = useState([])
    useEffect(() => {
        const estudiantesConInscripciones = async () => {
            const response = await getEstudiantesWithInscripciones()
            setListaEstudiantesConInscripciones(response)
        }
        estudiantesConInscripciones()
    })
    let estudiantesInscriptos: any = []

    const rellenarExcel = async () => {

    for ( const estudiante of listaEstudiantesConInscripciones){
     estudiantesInscriptos.push({
        // @ts-ignore
        nombre: estudiante.nombre,
        // @ts-ignore
        cursos: estudiante.cursos,
        // @ts-ignore        
        comisiones: estudiante.comisiones
    })  
    }
    }

    const exportarExcel = async () => {
        setIsLoading(true);
        // Rellenar las denuncias
        await rellenarExcel();
    
        // Crear una hoja de cálculo a partir de los datos de las denuncias
        const hoja = XLSX.utils.json_to_sheet(estudiantesInscriptos);
    
        // Modificar celdas para que se vean mejor al visualizar los datos
        hoja['!cols'] = [
          { wch: 20 }, //id A1
          { wch: 20 }, // Fecha B1
          { wch: 30 },  // Mes C1
     
        ];
        hoja['A1'] = { v: 'Nombre', t: 's' };
        hoja['B1'] = { v: 'Cursos', t: 's' };
        hoja['C1'] = { v: 'Comisiones', t: 's' };
     
        // Crear un libro de trabajo y agregar la hoja de cálculo
        const libro = utils.book_new();
        utils.book_append_sheet(libro, hoja, 'Estudiantes');
        // Escribir el libro de trabajo a un archivo Excel
        setIsLoading(false);
    
        writeFile(libro, 'estudiantes.xlsx');
    
      };
      
      return (<>
            {isLoading ? <p>Generando archivo...</p> : 
            <button onClick={() => exportarExcel()} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Estudiantes</button>                
            }
            </>
      );




}

export default ExcelComponente