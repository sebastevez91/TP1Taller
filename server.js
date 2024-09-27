const http = require('http');
let listaMaterias = [
    { id: 1, nombre: 'Matemáticas', cantidad: 30 },
    { id: 2, nombre: 'Física', cantidad: 25 },
    { id: 3, nombre: 'Química', cantidad: 20 },
    { id: 4, nombre: 'Historia', cantidad: 40 }
];;

const servidor = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/materias') {
        getMaterias(res);
    } else if (method === 'GET' && url.startsWith('/materias/')) {
        const id = parseInt(url.slice(10)); 

        if (!isNaN(id)) {
            getMateriaById(id, res);
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'ID inválido: no corresponde a ninguna materia.' }));
        }
    } else if (method === 'POST' && url === '/materias') {
        let body = '';

        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const nuevaMateria = JSON.parse(body);

                if (!nuevaMateria.id || !nuevaMateria.nombre || !nuevaMateria.cantidad) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Datos incompletos. Se requiere ID, nombre y cantidad.' }));
                    return;
                }

                // Validar si el ID ya existe
                if (listaMaterias.some(m => m.id === nuevaMateria.id)) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'ID de materia ya existente.' }));
                    return;
                }

                listaMaterias.push(nuevaMateria); 
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Materia agregada', materia: nuevaMateria }));

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error en el formato de la solicitud.' }));
            }
        });
    } else if (method === 'PUT' && url.startsWith("/materias/")) {
        const idMateria = parseInt(url.slice(10));
        let body = '';

        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const informacionEnviada = JSON.parse(body);
                const materiaIndex = listaMaterias.findIndex(m => m.id === idMateria);

                if (materiaIndex !== -1) {
                    listaMaterias[materiaIndex].nombre = informacionEnviada.nombre || listaMaterias[materiaIndex].nombre;
                    listaMaterias[materiaIndex].cantidad = informacionEnviada.cantidad || listaMaterias[materiaIndex].cantidad;
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Materia actualizada', materia: listaMaterias[materiaIndex] }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ mensaje: 'Materia no encontrada' }));
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error en el formato de la solicitud.' }));
            }
        });
    } else if (method === 'DELETE' && url.startsWith('/materias/')) {
        const idMateria = parseInt(url.slice(16));
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

function getMateriaById(id, res) {
    const materia = listaMaterias.find(itemArreglo => itemArreglo.id === id);
    if (materia) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(materia));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Materia no encontrada.' }));
    }
}

servidor.listen(3128, () => {
    console.log("Servidor ejecutándose");
});
