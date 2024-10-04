const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

let listaMaterias = [
    { id: 1, nombre: 'Matemáticas', cantidad: 30 },
    { id: 2, nombre: 'Física', cantidad: 25 },
    { id: 3, nombre: 'Química', cantidad: 20 },
    { id: 4, nombre: 'Historia', cantidad: 40 }
];

// Extensiones permitidas para archivos estáticos
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
};

// Función para servir archivos estáticos
function servirArchivoEstatico(rutaArchivo, res) {
    const ext = path.extname(rutaArchivo);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(rutaArchivo, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Archivo no encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        }
    });
}

// Crear el servidor
const servidor = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let rutaArchivo = '.' + parsedUrl.pathname;

    // Si no se especifica un archivo, usar 'index.html' por defecto
    if (rutaArchivo === './') {
        rutaArchivo = './index.html';
    }

    // Verificar si se está solicitando un archivo estático
    if (fs.existsSync(rutaArchivo)) {
        servirArchivoEstatico(rutaArchivo, res);
    }// Ruta para obtener la lista de materias
    else if (req.method === 'GET' && parsedUrl.pathname  === '/materias') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(listaMaterias));

    // Ruta para agregar una nueva materia (POST)
    } else if (req.method === 'POST' && parsedUrl.pathname  === '/materias') {
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
    } else if (req.method === 'DELETE' && url.startsWith('/materias/')) {
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
