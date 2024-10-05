<<<<<<< HEAD
# Gestion de materias ISTIC

Este proyecto es una aplicación web que permite gestionar materias de la carrera del ISTIC. Los usuarios pueden agregar materias, ver la lista actual y eliminar materias a través de una API REST.

## Instalación

1. Clona este repositorio: https://github.com/sebastevez91/TP1Taller.git
2. Instala las dependencias: `npm install` (si es necesario)
3. Ejecuta el servidor: `node server.js`
4. Abre el navegador y ve a `http://localhost:3128`

## Funcionalidades

- Agregar una nueva materia con el nombre y la cantidad de alumnos.
- Visualizar todas las materias ingresadas.
- Eliminar todas las materias o una en particular.

## Casos de prueba

- **Agregar una materia**: El usuario ingresa un nombre de materia y la cantidad de alumnos. Al enviar el formulario, la materia se agrega a la lista.
  
  ![Captura de pantalla_5-10-2024_112639_localhost](https://github.com/user-attachments/assets/f9fe96e9-23de-41e5-9c2f-787478d997c5)
  ![Captura de pantalla_5-10-2024_112737_localhost](https://github.com/user-attachments/assets/1a0d4f58-4f5b-4a0f-ac6f-f1057fa23885)



- **Eliminar una materia**: El usuario puede eliminar una materia especificando el nombre en la URL `/materias/:name`.
  
### Reflexiones

- Aprendizaje: Desarrollar el backend sin Express.js fue desafiante, pero permitió entender mejor cómo funciona Node.js puro.
- Dificultades: Una de las dificultades fue el manejo de las rutas y el procesamiento de JSON manualmente. Se resolvió con un manejo cuidadoso del URL y el cuerpo de la solicitud.
# TP1Taller
=======

