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
    // { path: '*', element: <NotFound /> },
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
