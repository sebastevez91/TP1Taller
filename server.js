const http = require('http');
const url = require('url');
const fs = require('fs');

const servidor = http.createServer((req, res) =>{
    if(req.method === 'GET' && req.url === '/materias'){
        getMaterias(res);
    }

    // Obtener las materias
    function getMaterias(res){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(listaMaterias));
    }

    if (req.method === 'GET' && req.url.startsWith('/materias/')) {
        //Extraer el ID de la URL, eliminando el prefijo '/api/materias/' (14 carácteres)

        const id = parseInt((req.url).slice(14));

        if (!isNaN(id)) {
            const materia = listaMaterias.find(itemArreglo =>
            
            itemArreglo.id === id);
            if (materia) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
        
            res.end(JSON.stringify(materia));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json'});
                
                res.end(JSON.stringify({ error: 'Materia no encontrada.'}));
        
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'ID inválido: no corresponde a ninguna materia.' }));
        }
    } else {
        // Manejar rutas no encontradas
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.');
    }

    if (req.method === 'POST' && req.url === '/materias') {
        let body = '';

        req.on('data', chunk => {
        body += chunk.toString();
        });

        req.on('end', () => {
            const nuevaMateria = JSON.parse(body);
            // Resto de código para guardar materia
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Materia agregada', materia: nuevaMateria }));
        });
    }


});

servidor.listen(3000, () => {
console.log("Servidor ejecutándose");
});