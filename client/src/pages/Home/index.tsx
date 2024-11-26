import NavBar from '../../components/NavBar/NavBar'
import Sections from '../../components/Sections/Sections'
function index() {

  const seccionesPagina = [
    {
      nombre: 'Reportes',
      url: '/reportes',
      SVGIcon: null
    },
    {
      nombre: 'Profesores',
      url: '/profesores',
      SVGIcon: null
    },
    {
      nombre: 'Materias',
      url: '/materias',
      SVGIcon: null
    },
    {
      nombre: 'Inscripciones',
      url: '/inscripciones',
      SVGIcon: null
    },
    {
      nombre: 'Estudiantes',
      url: '/estudiantes',
      SVGIcon: null
    },
    {
      nombre: 'Cursos',
      url: '/cursos',
      SVGIcon: null
    },
    {
      nombre: 'Comisiones',
      url: '/comisiones',
      SVGIcon: null
    }
  ]
  return (
    <div>
        <NavBar />
        <div className='m-4'>

        <h1 className='text-4xl'>Bienvenido al Sistema de Administración Escolar</h1>

        <h2 className='text-2xl mt-2'>Secciones</h2>
        <div className='grid gap-1 grid-cols-1 sm:grid-cols-1 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 w-full p-2'>
        {seccionesPagina.map((seccion, index) => {
          return ( 
            <Sections nombre={seccion.nombre} 
            url={seccion.url}
            SVGIcon={seccion.SVGIcon}
            key={index}
            />
          )
        })}
        </div>

        </div>
    </div>
  )
}

export default index