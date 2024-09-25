document.getElementById('materiaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir la recarga del formulario
    const resultado = document.getElementById('resultado');
    const materiaForm = document.getElementById('materiaForm');

    // Obtener valores del formulario
    const nombreMateria = document.getElementById('materia').value;
    const cantidadAlumnos = document.getElementById('cantidad').value;
    
    // Parte del POST
    const nuevaMateria = {
        nombre: nombreMateria,
        cantidad: cantidadAlumnos
    };

    // Enviar datos al servidor con POST
    fetch('http://localhost:3000/materias', {
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
        alert('Materia agregada exitosamente.');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al agregar la materia.');
    });

    // Parte del PUT
    const idCurso = document.getElementById('id').value;
    const nuevoNombre = document.getElementById('nuevoNombre').value;

    const nuevaDataMateria = {
        name: nuevoNombre
    };

    fetch(`/materias/${idCurso}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaDataMateria)
    })
    .then(response => response.json())
    .then(result => {
        alert('Materia actualizada exitosamente.');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al actualizar la materia.');
    }); 

    // Parte de DELETE
    const idMateriaAEliminar = document.getElementById("idMateriaAEliminar").value;

    fetch(`/delete/materia/${idMateriaAEliminar}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'Materia eliminada') {
            alert('Materia eliminada exitosamente.');
            console.log('Eliminación exitosa:', data);
        } else {
            console.log('Error:', data.mensaje);
            alert('Hubo un error al eliminar la materia.');
        }
    })
    .catch(error => {
        console.error('Error en la petición:', error);
        alert('Hubo un error al eliminar la materia.');
    });
});
    