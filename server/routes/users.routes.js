const UserController = require('../controllers/users.controller');

module.exports = (app) => {
    app.post('/api/newUser', UserController.registrar);
    app.post('/api/login', UserController.login);
}