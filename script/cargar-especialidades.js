
// Cuando el documento HTML haya terminado de cargarse (el DOM esté listo), ejecuta esta función
document.addEventListener('DOMContentLoaded', function() {
    // Ruta del JSON 
    const rutaJSON = 'data/especialistas.json';

//es una función moderna para hacer peticiones de red. Devuelve una promesa (un objeto que representa una operación asíncrona).
    fetch(rutaJSON)
        .then(response => { /* .then recibe la respuesta del servidor.
response.ok es true si la petición fue exitosa (código 200). Si no, lanzamos un error con el código de estado.
response.json() convierte la respuesta (que viene como texto JSON) en un objeto JavaScript. Esto también es asíncrono, por eso devuelve otra promesa*/
            if (!response.ok) {
                throw new Error('Error al cargar los datos: ' + response.status);
            }
            return response.json();
        })  
        .then(data => {/* data ya es el array de médicos (el contenido del JSON). Este segundo .then se ejecuta cuando los datos ya están convertidos. */
            const contenedor = document.getElementById('especialistas-container');
            if (!contenedor) {
                console.error('No se encontró el contenedor con id "especialistas-container"');
                return; /*Buscamos el elemento HTML donde pondremos las tarjetas. Si no existe, mostramos un error en consola y salimos.*/
            }

            // Limpiar el contenedor
            contenedor.innerHTML = '';

            // Recorrer cada médico y crear una card
            data.forEach(medico => {
                // Crear el div de la card
                const card = document.createElement('div');
                card.className = 'card';

                // Imagen (div con background)
                const imagenDiv = document.createElement('div');
                imagenDiv.className = 'card-imagen';
                // Si existe la propiedad foto, la usamos; si no, una imagen por defecto
                const foto = medico.foto ? medico.foto : 'img/doctor-default.jpg';
                imagenDiv.style.backgroundImage = `url('${foto}')`;
                // Asegurar que el background se vea bien
                imagenDiv.style.backgroundSize = 'cover';
                imagenDiv.style.backgroundPosition = 'center';

                // Texto de la card
                const textDiv = document.createElement('div');
                textDiv.className = 'card-text';

                // Construir el HTML interior
                textDiv.innerHTML = `
                    <h2>${medico.nombre || 'Nombre no disponible'}</h2>
                    <p><strong>Especialidad:</strong> ${medico.especialidad || 'No especificada'}</p>
                    <p><strong>Horario:</strong> ${medico.horario?.dias || '?'} ${medico.horario?.horas || ''}</p>
                    <p><strong>Consultorio:</strong> ${medico.consultorio || 'N/A'}</p>
                    <a href="consulta.html" class="btn-cita">Pedir Cita</a>
                `;

                // Agregar los elementos a la card
                card.appendChild(imagenDiv);
                card.appendChild(textDiv);

                // Agregar la card al contenedor
                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const contenedor = document.getElementById('especialistas-container');
            if (contenedor) {
                contenedor.innerHTML = '<p style="color:red;">Error al cargar los especialistas. Intenta más tarde.</p>';
            }
        }); /*Si ocurre cualquier error en la cadena de promesas (por ejemplo, el archivo JSON no existe, o hay un problema de red), el catch lo captura.*/
});