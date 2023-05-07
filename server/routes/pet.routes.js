const PetController = require('../controllers/pet.controller');


module.exports = app => {
    app.post('/api/pet/new', PetController.crear);
    app.get('/api/pet', PetController.listar);
    app.get('/api/pet/:id', PetController.listarId);
    app.put('/api/pet/update/:id', PetController.actualizar);
    app.delete('/api/pet/delete/:id', PetController.eliminar);
}