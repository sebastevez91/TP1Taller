const http = require('http');
const url = require('url');
const fs = require('fs');
let listaMaterias = new Array();

const servidor = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/materias') {
        getMaterias(res);
    } else if (req.method === 'GET' && req.url.startsWith('/materias/')) {
        const id = parseInt((req.url).slice(10)); // Corrige el prefijo a 10 caracteres

        if (!isNaN(id)) {
            const materia = listaMaterias.find(itemArreglo => itemArreglo.id === id);
            if (materia) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(materia));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Materia no encontrada.' }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'ID inválido: no corresponde a ninguna materia.' }));
        }
    } else if (req.method === 'POST' && req.url === '/materias') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const nuevaMateria = JSON.parse(body);
            listaMaterias.push(nuevaMateria); // Añadir la materia a la lista
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Materia agregada', materia: nuevaMateria }));
        });
    } else if (req.method === 'PUT' && req.url.startsWith("/materias/")) {
        const idMateria = parseInt((req.url).slice(10)); // Corrige el prefijo a 10 caracteres
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const informacionEnviada = JSON.parse(body);
            const materiaIndex = listaMaterias.findIndex(m => m.id === idMateria);

            if (materiaIndex !== -1) {
                listaMaterias[materiaIndex].name = informacionEnviada.name;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Materia actualizada', materia: listaMaterias[materiaIndex] }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'Materia no encontrada' }));
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/delete/materia/')) {
        const idMateria = parseInt((req.url).slice(16)); // Corrige el prefijo a 16 caracteres
        const indiceMateria = listaMaterias.findIndex(materia => materia.id == idMateria);

        if (indiceMateria !== -1) {
            const materiaEliminada = listaMaterias.splice(indiceMateria, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Materia eliminada', materia: materiaEliminada }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Materia no encontrada' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.');
    }
});

// Obtener las materias
function getMaterias(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(listaMaterias));
}

servidor.listen(3128, () => {
    console.log("Servidor ejecutándose");
});
