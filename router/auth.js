
const User = require('../models/User');
const express = require("express");
const app = express();
const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Schema para Registrar Usuario
const schemeRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// Schema Login del Usuario
const schemeLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// Logear a un usuario
router.post('/login', async (request, response) => {

    // Validaciones
    const { error } = schemeLogin.validate(request.body);
    if (error)
        //return response.status(400).json({ error: error.details[0].message })
        return response.redirect("/404")

    // Verificamos si el su email usuario existe 
    const user = await User.findOne({ email: request.body.email });
    if (!user)
        return response.redirect("/userNotFound")

    // Verificar el password del usuario
    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword)
        return response.redirect("/passwordNotFound")

    // Creamos el Token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);

    response.redirect("/mascotas")

}),

    // Método para registrar a un usuario
    router.post('/register', async (request, response) => {
        console.log("1");

        // Validación de la data que nos llega por el request
        const { error } = schemeRegister.validate(request.body);

        if (error) {
            return response.status(400).json(
                {
                    error: error.details[0].message
                }
            )
        }

        // Verifico si existe un usuario con un email determinado

        const isEmailExist = await User.findOne({ email: request.body.email });
        if (isEmailExist) {
            return response.status(400).json({ error: 'Email ya registrado' });
        }

        // Encriptación del password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(request.body.password, salt);

        // Creación de nuestro usuario
        const user = new User(
            {
                name: request.body.name,
                email: request.body.email,
                password: password
            });

        try {
            const savedUser = await user.save();
            response.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            response.status(400).json({ error });
        }
    });

module.exports = router;
