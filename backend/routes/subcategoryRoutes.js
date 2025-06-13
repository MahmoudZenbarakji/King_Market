const express = require('express');
const router = express.Router();
const subcategoryController = require('../Controllers/subcategoryController');

router.post('/', subcategoryController.createSubcategory);
router.get('/', subcategoryController.getSubcategoriesByCategory);
router.put('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;