const router = require('express').Router();
const UserController = require('../controllers/users.controller');

router.post(
    '/newUser',
    [],
    UserController.registrar
);

router.post(
    '/login',
    [],
    UserController.login
);

router.get(
    '/confirm/:token',
    [],
    UserController.confirmar
);

module.exports = router;