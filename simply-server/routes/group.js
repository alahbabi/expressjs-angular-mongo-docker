const express = require('express');
const router = express.Router();
const group_controller = require('../controllers/group');

router.post('/', group_controller.addGroup);
router.get('/', group_controller.findAll);
router.get('/:id', group_controller.findById);
router.get('/owner/:owner', group_controller.findAllByOwner);
router.put('/:id', group_controller.update);
router.delete('/:id', group_controller.delete);
router.post('/invit', group_controller.sendInvitation);
router.post('/add', group_controller.addToGroup);
router.delete('/remove/:idGroup/:idStudent', group_controller.removeFromGroup);

module.exports = router;
