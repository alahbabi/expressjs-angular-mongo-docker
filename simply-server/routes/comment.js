const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment');

router.post('/register', comment_controller.addComment);
router.get('/', comment_controller.findAll);
router.get('/:id', comment_controller.findById);
router.put('/:id', comment_controller.update);
router.delete('/:id', comment_controller.delete);

module.exports = router;
