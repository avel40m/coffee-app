const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000'
}));
const routes = require('./Routes/index');
const users = require('./Routes/users');
const category = require('./Routes/productCategory');
const product = require('./Routes/product.js');

mongoose.connect('mongodb://localhost:27017/coffee-app')
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(`Hay un error de la base de datos: ${error}`));

app.use('/', routes);
app.use('/users', users);
app.use('/product/category', category);
app.use('/product', product);

app.listen(4000,() => {
    console.log('El servidor está escuchando el puerto 4000');
});