const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');
const checkAuth = require('../middleware/check-auth')

router.post('/login', user_controller.login);
router.post('/register', user_controller.addUser);
router.get('/', checkAuth, user_controller.findAll);
router.get('/:id', checkAuth, user_controller.findById);
router.get('/group/:id', checkAuth, user_controller.findByGroupId);
router.put('/:id', checkAuth, user_controller.update);
router.delete('/:id', checkAuth, user_controller.delete);


module.exports = router;
