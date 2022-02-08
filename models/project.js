'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String, 
});


//mongoogse lo que hace con project, segun la coleccion creada es pluralizarla y ponerla en minuscula
module.exports = mongoose.model('Project', ProjectSchema);
