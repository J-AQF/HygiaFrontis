
// Establecer fecha mínima en el campo de fecha (hoy)
const hoy = new Date().toISOString().split('T')[0];
document.getElementById('fecha').setAttribute('min', hoy);


document.getElementById('form-cita').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío a Formspree

    // Validar manualmente (opcional, pero el navegador ya valida)
    if (!this.checkValidity()) {
        this.reportValidity();
        return;
    }

    // Recoger datos
    const cita = {
        id: Date.now(), // Identificador único
        nombre: document.getElementById('nombre').value,
        cedula: document.getElementById('cedula').value,
        correo: document.getElementById('correo').value,
        especialidad: document.getElementById('especialidad').value,
        fecha: document.getElementById('fecha').value
    };

    // Obtener citas existentes o array vacío
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citas));

    // Mostrar mensaje de éxito
    alert('Cita solicitada con éxito');

    // Limpiar formulario
    this.reset();

    // Actualizar lista de citas
    mostrarCitas();
});

// Función para mostrar citas guardadas
function mostrarCitas() {
    const lista = document.getElementById('listaCitas');
    const citas = JSON.parse(localStorage.getItem('citas')) || [];

    if (citas.length === 0) {
        lista.innerHTML = '<p>No tienes citas guardadas.</p>';
        return;
    }

    let html = '<ul>';
    citas.forEach(cita => {
        html += `<li>
            <strong>${cita.nombre}</strong> - ${cita.especialidad} - ${cita.fecha}
            <button onclick="eliminarCita(${cita.id})">Eliminar</button>
        </li>`;
    });
    html += '</ul>';
    lista.innerHTML = html;
}

// Función para eliminar una cita
window.eliminarCita = function(id) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas = citas.filter(c => c.id !== id);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarCitas();
};

// Botón actualizar
document.getElementById('actualizarCitas').addEventListener('click', mostrarCitas);

// Mostrar citas al cargar la página
mostrarCitas();
