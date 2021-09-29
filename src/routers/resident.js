const express = require('express');
const router = express.Router();

const residentController = require('../app/controllers/ResidentController');
const upload = require('../middleware/upload');

router.get('/create', residentController.create);
router.post('/store',upload.array('image'), residentController.store);
router.get('/:id/edit', residentController.edit);
router.put('/:id/', residentController.update);
router.delete('/:id/', residentController.destroy);
router.get('/:id', residentController.show);

module.exports = router;