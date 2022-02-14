'use strict';


let Client = require('../models/client');


let controllers = {


    getClients: function (req, res) {

        Client.find({ isDeleted: false }).exec((err, clients) => {

            if (err) return res.status(500).send({ message: "error al procesar los documentos" });
            if (!clients) return res.status(404).send({ message: "El documento no existe" });
            return res.status(202).send({
                clients: clients
            })
        })
    },

    getClient: function (req, res) {

        let clientId = req.params.id;

        Client.findById(clientId, (err, client) => {
            if (err) return res.status(500).send({ message: "error al procesar el documento" });
            if (!client) return res.status(404).send({ message: "el usuario no existe" });

            return res.status(202).send({ client: client });
        });
    },


    postClient: function (req, res) {

        let client = new Client();
        let params = req.body;
        client.name = params.name;
        client.email = params.email;
        client.phone = params.phone;
        client.city = params.city;
        client.isDeleted = false;

        client.save((err, client) => {
            if (err) return res.status(500).send({ message: "error al guardar" });
            if (!client) return res.status(404).send({ message: "Error al guardar el documento" })
            return res.status(202).send({ client: client });
        })
    },


    updateClient: function (req, res) {

        let clientId = req.params.id;
        let update = req.body;


        Client.findByIdAndUpdate(clientId, update, (err, clientUpdate) => {
            if (err) return res.status(500).send({ message: "error al Actualizar" });
            if (!clientUpdate) return res.status(404).send({ message: "Error no se puede actualizar el documento" })
            return res.status(202).send({ client: clientUpdate });
        })

    },

    deleteClient: function (req, res) {
        let clientId = req.params.id;

        Client.findByIdAndUpdate(clientId, { isDeleted: true }, { new: true }, (err, clientDelete) => {
            if (err) return res.status(500).send({ message: "error al Actualizar" });
            if (!clientDelete) return res.status(404).send({ message: "Error no se puede actualizar el documento" })
            return res.status(202).send({ client: clientDelete });
        })
    }
}

module.exports = controllers;