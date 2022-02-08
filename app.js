'use strict';


let express = require('express');
let bodyParser = require('body-parser');

let app = express();

//cargar los archivos de rutas
let project_routers = require('./rutes/project');
app.use(bodyParser.urlencoded({ extended: true }));


//Rutas

app.use('/api', project_routers);

//middelwares: es un metodo que se usa antes de ejecutar la accion de un controlador (resultaod de la peticion);

app.use(bodyParser.urlencoded({extended: false})); //configuacion de body parser
app.use(bodyParser.json()) // es todo lo que llegue convertirlo a Json




// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});





/// exportar


module.exports = app;