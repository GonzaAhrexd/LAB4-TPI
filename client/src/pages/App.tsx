/*
  [Rutas]
  Descripción: En este archivo se  utiliza React router para crear las distintas rutas de nuestra aplicación .
  También, se importa el contexto de autenticación y campos para que estén disponibles en toda la aplicación.
*/
// Enrutamiento
import { useRoutes, BrowserRouter } from 'react-router-dom'
// Páginas
// LOGIN E INICIO
import Home from './Home'
import Comisiones from './Comisiones'
import Cursos from './Cursos'
import Estudiantes from './Estudiantes'
import Inscripciones from './Inscripciones'
import Materias from './Materias'
import Profesores from './Profesores'
import Reportes from './Reportes'
// 404
// import NotFound from './NotFound'
// DENUNCIAS

// CSS
import '../App.css'

const AppRoutes = () => {
  // Rutas de la aplicación
  let routes = useRoutes([
    // Global
    { path: '/', element: <Home /> },
    { path: '/comisiones', element: <Comisiones /> },
    { path: '/cursos', element: <Cursos /> },
    { path: '/estudiantes', element: <Estudiantes /> },
    { path: '/inscripciones', element: <Inscripciones /> },
    { path: '/materias', element: <Materias /> },
    { path: '/profesores', element: <Profesores /> },
    { path: '/reportes', element: <Reportes /> },
      ])
  return routes
}

const App = () => {
  
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App
