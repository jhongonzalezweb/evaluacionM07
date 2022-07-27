const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotasSchema = new Schema(

    {
        nombre: String,
        raza: String,
        fecha_nacimiento: String,
        nombre_dueno: String

    }
);

// Crear el modelo

const Mascota = mongoose.model('mascotas', mascotasSchema);

module.exports = Mascota;

