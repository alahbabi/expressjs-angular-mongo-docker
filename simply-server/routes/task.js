const express = require('express');
const router = express.Router();
const task_controller = require('../controllers/task');

router.post('/register', task_controller.addTask);
router.get('/', task_controller.findAll);
router.get('/:id', task_controller.findById);
router.put('/:id', task_controller.update);
router.delete('/:id', task_controller.delete);

module.exports = router;
