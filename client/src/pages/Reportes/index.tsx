import NavBar from '../../components/NavBar/NavBar'
import ExcelEstudiante from './Excels/ExcelEstudiante'
import CursosPorMateria from './Excels/ExcelCursosPorMateria'
import ExcelComisiones from './Excels/ExcelComisiones'
function index() {

    return (
        <div>
            <NavBar />
            <h1 className='m-4 text-4xl'>Generar reportes</h1>
            <div className='flex flex-col items-center justify-center'>
                {/* <button onClick={} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Cursos</button>
                <button onClick={} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Comisiones y Horarios</button>
                <button onClick={} className='m-2 bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-4/10'>Profesores</button> */}

                    <ExcelEstudiante />
                    <CursosPorMateria />
                    <ExcelComisiones  />
                    <ExcelComisiones sortByProfesor />
            </div>

        </div>
    )
}

export default index