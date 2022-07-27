
const { application } = require("express");
const express = require("express");
const router = express.Router();

router.get('/', (request, response) => {
    response.render("index", { titulo: "Veterinaria" });
});

router.get('/userNotFound', (request, response) => {
    response.render("userNotFound", { titulo: "Email no encontrado" });
});

router.get('/passwordNotFound', (request, response) => {
    response.render("passwordNotFound", { titulo: "Contraseña erronea" });
});

router.get('/404', (request, response) => {
    response.render("404", { titulo: "No encontrado" });
});


module.exports = router;