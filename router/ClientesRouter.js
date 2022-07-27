
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

const Mascota = require('../models/mascotas');

router.get('/', async (request, response) => {
    try {
        const arrayClientesDB = await Mascota.find()

        response.render("mascotas", {
            arrayClientes: arrayClientesDB
        })
    }
    catch (e) {
        console.log(e)
    }
})

router.get("/agregarMascota", (request, response) => {
    response.render("agregarMascota")
})

router.post("/agregarMascota", async (request, response) => {
    const body = request.body;
    console.log(body)

    try {
        const clienteBD = new Mascota(body)
        await clienteBD.save()

        response.redirect("/mascotas")
    } catch (error) {
        console.log(error)
    }
})

// Código para ver el cliente (y posteriormente, modificarlo)
router.get('/verMascota/:id', async (request, response) => {
    const id = request.params.id;

    const clienteBD = await Mascota.findOne({ _id: id });

    response.render("editarMascota", {
        nombre: clienteBD.nombre,
        raza: clienteBD.raza,
        fecha_nacimiento: clienteBD.fecha_nacimiento,
        nombre_dueno: clienteBD.nombre_dueno,
        id: id
    });

})

// Código para modificar a un cliente
router.post('/verMascota/editarMascota', async (request, response) => {
    const body = request.body;
    const id = request.body.id;
    console.log(body);

    try {

        const clienteDB = await Mascota.findByIdAndUpdate(
            id, body, { userFindAndModify: false }
        )

        response.redirect('/mascotas');

    } catch (error) {
        console.log(error);
    }

})

// metodo para eliminar con delete

router.delete("/:id", async (request, response) => {
    const id = request.params.id;
    const clienteBD = await Mascota.findByIdAndRemove({ _id: id });

    response.redirect('/mascotas');
})

module.exports = router;