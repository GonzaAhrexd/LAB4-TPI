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

## 📷 Capturas 
Algunas capturas de pantalla del proyecto

![Pantalla principal](https://cdn.discordapp.com/attachments/740761148642689055/1311121451515904051/image.png?ex=6747b481&is=67466301&hm=3c731bf2a67064d0c9764f7eb3069e112702af11aff5673e92a3067236d62e1f&)

![Agregar profesores](https://cdn.discordapp.com/attachments/740761148642689055/1311121508545986620/image.png?ex=6747b48f&is=6746630f&hm=24ed96cef3de6a6ab49209b0077e27dd9843e3db035236ff524dc720f71c6c3a&)

![Buscar estudiantes](https://cdn.discordapp.com/attachments/740761148642689055/1311121599763841104/image.png?ex=6747b4a4&is=67466324&hm=a79146b32b7b0964fb4e1c35d98ee008d441e20c99e6a6ac1f4d51be28145e72&)

![Generar reportes](https://cdn.discordapp.com/attachments/740761148642689055/1311121646689452103/image.png?ex=6747b4b0&is=67466330&hm=6576c886aa8de8685b5b4c776c901380204f06ba1a076304bda852ed7a64478c&)


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
