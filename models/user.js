'use strict'


let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    isDeleted: Boolean,

})

module.exports = mongoose.model('User', UserSchema)