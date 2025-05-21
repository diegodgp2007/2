class SistemaCine {
    constructor() {
        this.form = document.getElementById('peliculaForm');
        this.tabla = document.getElementById('peliculasTabla').getElementsByTagName('tbody')[0];
        
        this.form.addEventListener('submit', (e) => this.manejarEnvioFormulario(e));
        this.cargarPeliculas();
    }

    async manejarEnvioFormulario(e) {
        e.preventDefault();
        
        const peliculaId = document.getElementById('peliculaId').value;
        const pelicula = {
            titulo: document.getElementById('titulo').value,
            director: document.getElementById('director').value,
            duracion: document.getElementById('duracion').value,
            genero: document.getElementById('genero').value
        };

        try {
            if (peliculaId) {
                await this.actualizarPelicula(peliculaId, pelicula);
            } else {
                await this.agregarPelicula(pelicula);
            }

            this.form.reset();
            document.getElementById('peliculaId').value = '';
            this.cargarPeliculas();
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar la película');
        }
    }

    async agregarPelicula(pelicula) {
        const response = await fetch('/api/peliculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula)
        });
        return response.json();
    }

    async actualizarPelicula(id, peliculaActualizada) {
        const response = await fetch(`/api/peliculas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peliculaActualizada)
        });
        return response.json();
    }

    async eliminarPelicula(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
            await fetch(`/api/peliculas/${id}`, {
                method: 'DELETE'
            });
            this.cargarPeliculas();
        }
    }

    editarPelicula(pelicula) {
        document.getElementById('peliculaId').value = pelicula._id;
        document.getElementById('titulo').value = pelicula.titulo;
        document.getElementById('director').value = pelicula.director;
        document.getElementById('duracion').value = pelicula.duracion;
        document.getElementById('genero').value = pelicula.genero;
    }

    async cargarPeliculas() {
        try {
            const response = await fetch('/api/peliculas');
            const peliculas = await response.json();
            
            this.tabla.innerHTML = '';
            peliculas.forEach(pelicula => {
                const fila = this.tabla.insertRow();
                fila.innerHTML = `
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.director}</td>
                    <td>${pelicula.duracion}</td>
                    <td>${pelicula.genero}</td>
                    <td>
                        <button class="btn-edit" onclick='sistemaCine.editarPelicula(${JSON.stringify(pelicula)})'>Editar</button>
                        <button class="btn-delete" onclick='sistemaCine.eliminarPelicula("${pelicula._id}")'>Eliminar</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Error al cargar películas:', error);
            alert('Error al cargar las películas');
        }
    }
}

// Inicializar el sistema
const sistemaCine = new SistemaCine();