'use strict';


const User = require('../models/user');

let bcrypt = require('bcrypt');
const user = require('../models/user');

let controllers = {

    getUsers: function (req, res) {

        user.find({ isDeleted: false }).exec((err, users) => {
            if (err) return res.status(500).send({ message: "Error al devolver los datos" });
            if (!users) return res.status(404).send({ message: "no hay usuarios para mostrar" })

            return res.status(200).send(users)
        });

    },

    getUser: function (req, res) {
        let userId = req.params.id;
        // if (userId == null) {
        //     return res.status(404).send({ message: "Usuario no existe" });
        // }
        user.findById(userId, (err, user) => {
            if (err) return res.status(500).send({ message: "error al procesar el documento" });
            if (!user) return res.status(404).send({ message: "el usuario/doc no existe" });
            return res.status(200).send({ user: user });
        })
    },

    saveUser: function (req, res) {
        let user = new User();
        let params = req.body;
        user.name = params.name;
        user.email = params.email;
        // user.password = params.password;
        user.phone = params.phone;
        user.isDeleted = false;
        const password = "mypass123"

        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                throw saltError
            } else {
             bcrypt.hash(params.password, salt,  function (hashError, hash) {
                    if (hashError) {
                        throw hashError;
                    } else {
                        console.log(hash);
                        params.password = hash;
                        user.password = params.password;
                        console.log("gonorreaaaa", user.password);
                        user.save((err, userStored) => {
                            console.log(userStored);
                            if (err) return res.status(500).send({ message: "no se puede guardar" });
                            if (!userStored) return res.status(404).send({ message: "no se puede guardar Usuario / Documento" });
                            return res.status(200).send({ user: userStored });
                        })
                        //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
                    }
                })
            }
        })

    },

    updateUser: function (req, res) {

        let userId = req.params.id;
        let update = req.body;
        user.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdate) => {
            if (err) return res.status(500).send({ message: "error al actualizar" });
            if (!userUpdate) return res.status(404).send({ message: "error al actualizar el usuario/documento" });
            return res.status(200).send({
                user: userUpdate
            });
        })
    },
    deleteUser: function (req, res) {
        let userId = req.params.id;

        user.findByIdAndUpdate(userId, { isDeleted: true }, { new: true }, (err, userDeleted) => {
            if (err) return res.status(500).send({ message: "error al Eliminar" });
            if (!userDeleted) return res.status(404).send({ message: "error al eliminar usuario" });

            return res.status(200).send({
                user: userDeleted
            })
        })
    }

}

module.exports = controllers;