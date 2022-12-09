'use strinct'

const express = require('express'); //express é o pacote responsável pela estrutura MVC.
const bodyParser = require('body-parser'); //Importando o pacote BodyParser. Esse pacote é um midleware responsável por fazer a conversão do corpo da requisição para JSON.
const mongoose = require('mongoose');
const config = require('./config')

const app = express();

//Conecta ao banco de dados
mongoose.connect(config.connectionString);

//Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregar as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb' //Limitando o limite de tamanho para um JSON (5mb no caso)
})); //Definindo que queremos utilizar o bodyParser para JSON
app.use(bodyParser.urlencoded({
    extended: false
})); //Definindo que queremos codificar as URLs

//Habilita o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app; //Exportando a const app. Nesse caso, a const APP é a instância do modulo express() importado na linha 3!