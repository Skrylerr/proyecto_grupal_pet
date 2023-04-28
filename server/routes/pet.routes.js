const PetController = require('../controllers/pet.controller');
/* const { autenticar } = require('../config/jwt.config'); */

module.exports = app => {
    app.post('/api/pet/new', /* autenticar, */ PetController.crear);
    app.get('/api/pet', /* autenticar, */ PetController.listar);
    app.get('/api/pet/:id', /* autenticar, */ PetController.listarId);
    app.put('/api/pet/update/:id', /* autenticar, */ PetController.actualizar);
    app.delete('/api/pet/delete/:id', /* autenticar, */ PetController.eliminar);
}