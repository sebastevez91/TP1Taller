const subjectList = document.getElementById('subject-list');
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
        resultado.innerHTML = `<p>Materia agregada: ${nuevaMateria.nombre} (${nuevaMateria.cantidad} alumnos)</p>`;
        document.getElementById('materiaForm').reset();
        alert('Materia agregada exitosamente.');
        // Actualizar la lista de materias al obtenerlas de nuevo del servidor
        obtenerMaterias();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al agregar la materia.');
    });
}
// Función para eliminar todas las materias (DELETE)
function eliminarMaterias(){
    fetch(`http://localhost:3128/materias/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

// Función para eliminar materia por ID (DELETE/id:)
function eliminarMateriaID() {

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

// Función para actualizar la etiqueta table

function updateSubjectList(subjects) {
    subjectList.innerHTML = '';
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${subject.nombre}</td><td>${subject.cantidad}</td>`;
        subjectList.appendChild(row);
    });
}

// Obtener la lista inicial de materias
function obtenerMaterias() {
    fetch('http://localhost:3128/materias')
        .then(response => response.json())
        .then(data => updateSubjectList(data));
}

// Obtener la lista inicial de materias al cargar la página
obtenerMaterias();
