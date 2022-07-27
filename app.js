const mongoose = require('mongoose');
const express = require("express");

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexion a la base de datos
const uri = `mongodb+srv://${process.env.USERA}:${process.env.PASSWORDA}@cluster0.sjaj7.mongodb.net/${process.env.DBNAMEA}?retryWrites=true&w=majority`
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Hooray!!..\nMongoDB connected...'))
    .catch(err => console.log(err));

// Motor de plantillas 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

// Importación de router
const authRoutes = require('./router/auth')

// Código de los router
app.use('/api/user', authRoutes);

// Especificación de las rutas 
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/ClientesRouter'));

app.use('/user', require('./router/auth'))

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto \nhttp://localhost:${PORT}/`);
});
