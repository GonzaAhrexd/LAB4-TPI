# Gestión Escolar - Laboratorio 4

## 📚 Descripción del Proyecto  
Este proyecto consiste en el desarrollo de un sistema de gestión escolar, que permite administrar datos de estudiantes, cursos, profesores, materias, comisiones, e inscripción de estudiantes. El sistema está diseñado para ser funcional, intuitivo y eficiente, cumpliendo con los objetivos establecidos en  **Laboratorio de Computación IV**.

## 💪 Grupo
- Ebel, Gonzalo Nicolás - Legajo 28543
- Camors Vecchietti, Mauro Sebastián - Legajo 28143
- Baroni Pietto, Juan Cecilio - Legajo 28147
- Brabo, Leonardo David - Legajo 27978
- Romero, Franco Gabriel - Legajo 27367

## 🛠️ Características Principales  
- Gestión de estudiantes: **Crear, Leer, Actualizar y Eliminar (CRUD)** datos de estudiantes.  
- Gestión de cursos y asignaturas: Asignación de profesores y estudiantes.  

## 📋 Requisitos Previos  
Antes de comenzar, asegúrate de tener instalado:  
- **PHP** versión 8.2 o superior.  
- **Laravel** versión 11.  
- **MySQL** o cualquier sistema de base de datos compatible.  
- **Node.js** versión 16 o superior para el frontend.  
- **Composer** para la gestión de dependencias en PHP.  
- **NPM** o **Yarn** para la gestión de paquetes en React.  
- **XAMP** para el servidor Apache y MySQL

## 🚀 Instalación  
Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:  

1. **Clona el repositorio:**  
   ```bash
   git clone https://github.com/GonzaAhrexd/LAB4-TPI
   cd LAB4-TPI
   ```

2. **Instala las dependencias del backend:**  
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configura la base de datos:**  
   Edita el archivo `.env` y actualiza los valores de conexión:  
   ```env
   DB_CONNECTION=mysql  
   DB_HOST=127.0.0.1  
   DB_PORT=3306  
   DB_DATABASE= nombre_de_la_base_de_datos  
   DB_USERNAME=tu_usuario  
   DB_PASSWORD=tu_contraseña  
   ```

4. **Migra y carga datos:**  
   ```bash
   php artisan migrate
   ```

5. **Instala las dependencias del frontend y hazlo correr (Para esto, abrir un cmd aparte):**  
   ```bash
   cd client
   npm install
   npm run dev
   ```

6. **Inicia el servidor:**  
   ```bash
   php artisan serve
   ```

Accede al sistema en `http://localhost:5173/`. (Ruta del FrontEnd con React)


## 🛠️ Tecnologías Utilizadas  
- **Backend:** Laravel 11, PHP 8.2  
- **Frontend:** React, Tailwind CSS  
- **Base de Datos:** MySQL  
