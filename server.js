const http = require('http');
const fs = require('fs');
const path = require('path');

let listaMaterias = [
    { id: 1, nombre: 'Matemáticas', cantidad: 30 },
    { id: 2, nombre: 'Física', cantidad: 25 },
    { id: 3, nombre: 'Química', cantidad: 20 },
    { id: 4, nombre: 'Historia', cantidad: 40 }
];

// Crear el servidor
const servidor = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if(req.method == "GET" && parsedUrl.pathname == "/"){
    // Mostrar formulario para agregar registro
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (err, data) => {
    if (err) {
    res.writeHead(500);
    return res.end('Error cargando el formulario.');
    }
    res.end(data);
    });
    }
    // Ruta para obtener la lista de materias
    else if (method === 'GET' && url === '/materias') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(listaMaterias));

    // Ruta para agregar una nueva materia (POST)
    } else if (method === 'POST' && url === '/materias') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const nuevaMateria = JSON.parse(body);

            if (!nuevaMateria.nombre || !nuevaMateria.cantidad) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Datos incompletos. Se requiere nombre y cantidad.' }));
                return;
            }

            nuevaMateria.id = listaMaterias.length + 1;
            listaMaterias.push(nuevaMateria);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Materia agregada', materia: nuevaMateria }));
        });

    // Ruta para eliminar una materia (DELETE)
    } else if (method === 'DELETE' && url.startsWith('/materias/')) {
        const idMateria = parseInt(url.split('/')[2]);
        const indiceMateria = listaMaterias.findIndex(materia => materia.id === idMateria);

        if (indiceMateria !== -1) {
            const materiaEliminada = listaMaterias.splice(indiceMateria, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Materia eliminada', materia: materiaEliminada[0] }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Materia no encontrada' }));
        }

    // Ruta no encontrada
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.');
    }
});

// Iniciar el servidor en el puerto 3128
servidor.listen(3128, () => {
    console.log('Servidor ejecutándose en http://localhost:3128');
});
