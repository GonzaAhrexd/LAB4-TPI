import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div className='bg-blue-950 flex flex-row items-center justify-center'>
        <div className='flex flex-row items-center justify-between w-full max-w-6xl px-4 py-2'>
            <div className='flex flex-row items-center'>
            <h1 className='text-white text-2xl font-bold'>Administración Escolar</h1>
            </div>
            <div className='flex flex-row items-center'>
            <NavLink to={'/'}>
            <span className='text-white text-lg font-semibold mx-4'>Inicio</span>
            </NavLink>
            <NavLink to={'/estudiantes'}>
            <span className='text-white text-lg font-semibold mx-4'>Estudiantes</span>
            </NavLink>
            <NavLink to={'/cursos'}>
            <span className='text-white text-lg font-semibold mx-4'>Cursos</span>
            </NavLink>
            <NavLink to={'/profesores'}>
            <span className='text-white text-lg font-semibold mx-4'>Profesores</span>
            </NavLink>
            <NavLink to={'/materias'}>
            <span className='text-white text-lg font-semibold mx-4'>Materias</span>
            </NavLink>

            </div>
        </div>  
    </div>
  )
}

export default NavBar