document.addEventListener('DOMContentLoaded', function() {
    const resultado = document.getElementById('resultado');

    // Escuchar el evento submit del formulario
    materiaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Obtener valores del formulario
        const nombreMateria = document.getElementById('materia').value;
        const cantidadAlumnos = document.getElementById('cantidad').value;

        // Crear objeto para enviar al servidor
        const nuevaMateria = {
            nombre: nombreMateria,
            cantidad: cantidadAlumnos
        };

        // Enviar datos al servidor con POST
        fetch('/materias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaMateria)
        })
        .then(response => response.json())
        .then(data => {
            resultado.innerHTML = `<p>Materia agregada: ${data.nombre} (${data.cantidad} alumnos)</p>`;
            materiaForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
});
