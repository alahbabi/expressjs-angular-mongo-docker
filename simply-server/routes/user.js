const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');

router.post('/', user_controller.addUser);
router.post('/login', user_controller.login);
router.get('/all', user_controller.findAll);
router.get('/:id', user_controller.findById);
router.put('/:id', user_controller.update);
router.delete('/:id', user_controller.delete);

module.exports = router;
