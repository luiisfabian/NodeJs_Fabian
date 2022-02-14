'use strict'


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClientSchema = Schema({
    name: String,
    email: String,
    phone: Number,
    city: String,
    isDeleted: Boolean,


});
module.exports = mongoose.model('Client', ClientSchema);