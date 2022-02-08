'use strict'
const project = require('../models/project');
let Project = require('../models/project');

let fs = require('fs');

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

    getPorjectId: function (req, res) {
        let projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({ message: "el documento no existe" });
        }

        project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: "error al devolver los datos" });
            if (!project) return res.status(404).send({ message: "el documento no existe" });
            return res.status(200).send({ project: project })
        })
    },

    getProjects: function (req, res) {

        project.find({ isDeleted: false }).sort('+year').exec((err, projects) => {


            if (err) return res.status(500).send({ message: "error al devolver los datos" });
            if (!project) return res.status(404).send({ message: "no hay datos para mostrar" });
            return res.status(200).send(projects);
        })

    },

    updateProjectbyId: function (req, res) {

        let projectId = req.params.id;
        let update = req.body;

        project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return req.status(500).send({ message: "error al actualizar" });
            if (!projectUpdated) return rq.status(404).send({ message: "no se ha podudi actualizar" });
            return res.status(200).send({
                message: "Actualizo melo",
                project: projectUpdated
            })
        });
    },

    deleteProject: function(req, res){

        let projectId = req.params.id

        project.findByIdAndRemove(projectId, (err, projectDeleted)=>{
            if (err) return req.status(500).send({ message: "error al eliminar" });
            if (!projectDeleted) return rq.status(404).send({ message: "no se ha podido Eliminar" });
            return res.status(200).send({
                message: "Eliminado con exito",
                project: projectDeleted
            })
        })
    },

    uploadImage: function(req, res){

        var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('/.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}
    }

}

module.exports = controllers;