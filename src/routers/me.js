const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/users', meController.storedUser);
router.get('/stored/residents', meController.storedResident);
router.get('/trash/residents', meController.trashResident);

module.exports = router;
