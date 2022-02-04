'use strict';

let app = require('./app.js')
let port = 3700;



let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portafolio').then(()=>{
    console.log("Conecction Success");


    //creacion del servidor

    app.listen(port, ()=>{
        console.log("servidor Corriendo Correctamente en la URL localhost:3700");
    })

}).catch((err)=>{
console.log("error Connection ", err );
})