const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.delete('/:id', userController.deleteUser);

module.exports = router;
