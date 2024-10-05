# Gestion de materias ISTIC

Este proyecto es una aplicación web que permite gestionar materias de la carrera del ISTIC. Los usuarios pueden agregar materias, ver la lista actual y eliminar materias a través de una API REST.

## Instalación

1. Clona este repositorio: 
2. Instala las dependencias: `npm install` (si es necesario)
3. Ejecuta el servidor: `node server.js`
4. Abre el navegador y ve a `http://localhost:3128`

## Funcionalidades

- Agregar una nueva materia con el nombre y la cantidad de alumnos.
- Visualizar todas las materias ingresadas.
- Eliminar todas las materias o una en particular.

## Casos de prueba

- **Agregar una materia**: El usuario ingresa un nombre de materia y la cantidad de alumnos. Al enviar el formulario, la materia se agrega a la lista.
  
  

- **Eliminar una materia**: El usuario puede eliminar una materia especificando el nombre en la URL `/materias/:name`.

# TP1Taller