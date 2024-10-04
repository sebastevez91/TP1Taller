var accion = ""; // Determina si es agregar, actualizar o eliminar
const resultado = document.getElementById('resultado'); 

document.getElementById('materiaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir la recarga del formulario
        agregarMateria();
});

// Función para agregar materia (POST)
function agregarMateria() {
    const nombreMateria = document.getElementById('materia').value;
    const cantidadAlumnos = document.getElementById('cantidad').value;

    if (!nombreMateria || !cantidadAlumnos) {
        alert('Por favor completa todos los campos.');
        return;
    }

    const nuevaMateria = {
        nombre: nombreMateria,
        cantidad: cantidadAlumnos
    };

    fetch('http://localhost:3128/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaMateria)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        resultado.innerHTML = `<p>Materia agregada: ${data.nombre} (${data.cantidad} alumnos)</p>`;
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
    const idCurso = document.getElementById('idMat').value;
    const nuevoNombre = document.getElementById('nuevoNombre').value;

    if (!idCurso || !nuevoNombre) {
        alert('Por favor completa todos los campos.');
        return;
    }

    const nuevaDataMateria = {
        nombre: nuevoNombre
    };

    fetch(`http://localhost:3128/materias/${idCurso}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaDataMateria)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
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
    const idMateriaAEliminar = document.getElementById('idMat').value;

    if (!idMateriaAEliminar) {
        alert('Por favor ingresa un ID válido para eliminar.');
        return;
    }

    fetch(`http://localhost:3128/materias/${idMateriaAEliminar}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        if (data.mensaje === 'Materia eliminada') {
            alert('Materia eliminada exitosamente.');
            resultado.innerHTML = `<p>${data.mensaje}</p>`;
        } else {
            console.error('Error:', data.mensaje);
            alert('Hubo un error al eliminar la materia.');
        }
    })
    .catch(error => {
        console.error('Error en la petición:', error);
        alert('Hubo un error al eliminar la materia.');
    });
}
