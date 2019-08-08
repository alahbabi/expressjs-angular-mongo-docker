const express = require('express');
const router = express.Router();
const project_controller = require('../controllers/project');

router.post('/', project_controller.addProject);
router.get('/', project_controller.findAll);
router.get('/:id', project_controller.findById);
router.put('/:id', project_controller.update);
router.delete('/:id', project_controller.delete);

module.exports = router;
