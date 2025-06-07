const express = require('express');
const router = express.Router();
const upload = require('../utils/storage');
const {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require('../Controllers/subcategoryController');

router.route('/')
  .get(getSubcategories)
  .post(upload.single('image'), createSubcategory);

router.route('/:id')
  .get(getSubcategoryById)
  .put(upload.single('image'), updateSubcategory)
  .delete(deleteSubcategory);

module.exports = router;
