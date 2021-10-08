const express = require('express');
const router = express.Router();

const residentController = require('../app/controllers/ResidentController');

router.get('/create', residentController.create);
router.post('/store', residentController.store);
router.post('/handle-delete-form-actions',
    residentController.handleDeleteFormActions,
);
router.post( '/handle-restore-form-actions',
    residentController.handleRestoreFormActions,
);
router.post('/handle-form-actions', residentController.handleFormActions);
router.get('/:id/edit', residentController.edit);
router.put('/:id', residentController.update);
router.delete('/:id', residentController.destroy);
router.delete('/:id/force', residentController.destroyForce);
router.patch('/:id/restore', residentController.restore);
router.get('/:id', residentController.show);

module.exports = router;
