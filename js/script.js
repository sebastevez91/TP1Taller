document.getElementById('materiaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir la recarga del formulario

    const accion = document.getElementById('accion').value; // Determina si es agregar, actualizar o eliminar
    const resultado = document.getElementById('resultado');

    if (accion === 'agregar') {
        agregarMateria();
    } else if (accion === 'actualizar') {
        actualizarMateria();
    } else if (accion === 'eliminar') {
        eliminarMateria();
    }
});

// Función para agregar materia (POST)
function agregarMateria() {
    const nombreMateria = document.getElementById('materia').value;
    const cantidadAlumnos = document.getElementById('cantidad').value;
    
    const nuevaMateria = {
        nombre: nombreMateria,
        cantidad: cantidadAlumnos
    };

    fetch('http://localhost:3000/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaMateria)
    })
    .then(response => response.json())
    .then(data => {
        resultado.innerHTML = `<p>Materia agregada: ${data.materia.nombre} (${data.materia.cantidad} alumnos)</p>`;
        document.getElementById('materiaForm').reset();
        alert('Materia agregada exitosamente.');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al agregar la materia.');
    });
}

// Función para actualizar materia (PUT)
function actualizarMateria() {
    const idCurso = document.getElementById('id').value;
    const nuevoNombre = document.getElementById('nuevoNombre').value;

    const nuevaDataMateria = {
        name: nuevoNombre
    };

    fetch(`http://localhost:3000/materias/${idCurso}`, {
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
}

// Función para eliminar materia (DELETE)
function eliminarMateria() {
    const idMateriaAEliminar = document.getElementById("idMateriaAEliminar").value;

    fetch(`http://localhost:3000/delete/materia/${idMateriaAEliminar}`, {
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
}
