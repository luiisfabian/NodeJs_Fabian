'use strict'
const project = require('../models/project');
var Project = require('../models/project');

let controllers = {

    home: function (req, res) {
        return res.status(200).send({
            message: "soy el home que caa"
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: "soy el test que caja"
        });
    },

    saveProject: function (req, res) {
        let project = new Project();

        let params = req.body;


        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;


        project.save((err, projectStored) => {
            if (err) {
                console.log("GONORREAAAAAAAAAA", err);
                return res.status(500).send({ message: "Error al guardar el documento" })
            }
            if (!projectStored) return res.status(404).send({ message: "No se ha podido guardar el projecto" })
            return res.status(200).send({ project: projectStored });
        });

    },

    getPorject: function(req, res){
        let projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({message: "el documento no existe"});   
        }

        project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: "error al devolver los datos"});
            if(!project) return res.status(404).send({message: "el documento no existe"});
            return res.status(200).send({project: project})
        })
    }

}

module.exports = controllers;