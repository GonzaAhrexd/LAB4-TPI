import React from 'react'

function NavBar() {
  return (
    <div className='bg-blue-950 flex flex-row items-center justify-center'>
        <div className='flex flex-row items-center justify-between w-full max-w-6xl px-4 py-2'>
            <div className='flex flex-row items-center'>
            <h1 className='text-white text-2xl font-bold'>Administración Escolar</h1>
            </div>
            <div className='flex flex-row items-center'>
            <a href='#' className='text-white text-lg font-semibold mx-4'>Inicio</a>
            <a href='#' className='text-white text-lg font-semibold mx-4'>Alumnos</a>
            <a href='#' className='text-white text-lg font-semibold mx-4'>Cursos</a>
            <a href='#' className='text-white text-lg font-semibold mx-4'>Profesores</a>
            <a href='#' className='text-white text-lg font-semibold mx-4'>Estudiantes</a>
            </div>
        </div>  
    </div>
  )
}

export default NavBar