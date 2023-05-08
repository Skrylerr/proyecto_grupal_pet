const Pet = require("../models/pet.model");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports.crear = async (req, res) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  let files = req.files;
  let bodyData = req.body;
  for (const key in files) {
    await delay(50);
    const file = files[key];
    const extensionName = path.extname(file.name);
    var imageName = Math.floor(Date.now()) + extensionName;
    file.mv(`${__dirname}/../public/${imageName}`);
    bodyData[key] = imageName;
  }
  bodyData["coordenadas"] = JSON.parse(bodyData["coordenadas"]);

  // Set the user ID of the authenticated user to the pet's userId field
  let decodedJwt = jwt.decode(req.body.token, {
    complete: true
  });

  bodyData["userId"] = decodedJwt.payload._id;
  await Pet.create(bodyData)
    .then((resp) => {
      res.json({
        datosPet: resp,
        error: false
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        error: true,
        mensaje: "Ha ocurrido un error al crear la Mascota."
      });
    });
};

module.exports.listar = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json({ datosPet: pets, error: false });
  } catch (e) {
    res.status(500).json({
      error: true,
      mensaje: "Ha ocurrido un error al rescatar la información."
    });
  }
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
  const pet = await Pet.findById(req.params.id);
  const filesToDelete = [
    pet.linkimagen1,
    pet.linkimagen2,
    pet.linkimagen3,
    pet.linkimagen4
  ];
  const public = "./public/";
  for (file of filesToDelete) {
    fs.unlinkSync(public + file);
  }
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
  // ------------------------- DELETES PREVIOUS IMAGES
  const pet = await Pet.findById(req.params.id);
  const filesToDelete = [
    pet.linkimagen1,
    pet.linkimagen2,
    pet.linkimagen3,
    pet.linkimagen4
  ];
  const public = "./public/";
  for (file of filesToDelete) {
    fs.unlinkSync(public + file);
  }
  // ------------------------

  // ------------------------ CREATES ANDS SAVES THE INCOMING IMAGES AND CHANGES
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  let files = req.files;
  let bodyData = req.body;
  for (const key in files) {
    await delay(50);
    const file = files[key];
    const extensionName = path.extname(file.name);
    var imageName = Math.floor(Date.now()) + extensionName;
    file.mv(`${__dirname}/../public/${imageName}`);
    bodyData[key] = imageName;
  }
  bodyData["coordenadas"] = JSON.parse(bodyData["coordenadas"]);
  // ------------------------
  await Pet.findByIdAndUpdate(req.params.id, bodyData, { runValidators: true })
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

//module.exports.listarPorUsuario = async (req, res) => {
// try {
//const userId = req.params.userId;
//const pets = await Pet.find({ userId }).populate('userId');
//res.status(200).json({ success: true, data: pets });
//} catch (error) {
//console.error(error);
//res.status(500).json({ success: false, message: 'Error al obtener las mascotas del usuario.' });
//}
//};