const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('.'));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cinemaSistema', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
});

// Esquema de Película
const PeliculaSchema = new mongoose.Schema({
    titulo: String,
    director: String,
    duracion: Number,
    genero: String
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

// Rutas API
app.get('/api/peliculas', async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/peliculas', async (req, res) => {
    try {
        const pelicula = new Pelicula(req.body);
        await pelicula.save();
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/peliculas/:id', async (req, res) => {
    try {
        await Pelicula.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Película eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});