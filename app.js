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


// RUTAS



/// exportar


module.exports = app;