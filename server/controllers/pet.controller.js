const Pet = require("../models/pet.model");
const path = require("path");

module.exports.crear = async (req, res) => {
  let file = req.files.linkimagen;
  let bodyData = req.body;

  const extensionName = path.extname(file.name);

  var imageName = Math.floor(Date.now() / 1000) + extensionName;
  file.mv(`${__dirname}/../public/${imageName}`);

  bodyData["linkimagen"] = imageName;
  bodyData["coordenadas"] = JSON.parse(bodyData["coordenadas"]);
  await console.log(bodyData);

  await Pet.create(bodyData)
    .then((resp) => {
      res.json({
        datosPet: resp,
        error: false
      });
    })
    .catch((e) => {
      res.json({
        error: true,
        mensaje: "Ha ocurrido un error al crear la Mascota."
      });
    });
};

module.exports.listar = async (req, res) => {
  await Pet.find()
    .sort({ createdAt: -1 })
    .then((resp) => {
      res.json({
        datosPet: resp,
        error: false
      });
    })
    .catch((e) => {
      res.json({
        error: true,
        mensaje: "Ha ocurrido un error al rescatar la información."
      });
    });
};

module.exports.listarId = async (req, res) => {
  await Pet.findById(req.params.id)
    .then((resp) => {
      res.json({
        datosPet: resp,
        error: false
      });
    })
    .catch((e) => {
      res.json({
        error: true,
        mensaje: "No se puede obtener la informacion."
      });
    });
};

module.exports.eliminar = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id)
    .then((resp) => {
      res.json({
        error: false,
        mensaje: "La Mascota se ha eliminado correctamente."
      });
    })
    .catch((e) => {
      res.json({
        error: true,
        mensaje: "Ha ocurrido un error al eliminar la Mascota."
      });
    });
};

module.exports.actualizar = async (req, res) => {
  await Pet.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((resp) => {
      res.json({
        datosPet: req.datos,
        error: false
      });
    })
    .catch((e) => {
      res.json({
        error: true,
        mensaje: "No se puede obtener la informacion."
      });
    });
};
