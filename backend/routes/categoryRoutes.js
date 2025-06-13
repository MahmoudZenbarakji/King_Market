const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

// POST: Create new category
router.post('/', categoryController.createCategory);

// GET: Get all categories
router.get('/', categoryController.getCategories);

// PUT: Update category
router.put('/:id', categoryController.updateCategory);

// DELETE: Delete category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;