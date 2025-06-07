const express = require('express')
const app = express()
const router = express.Router();
const upload = require('../utils/storage');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails
} = require('../Controllers/categoryController');

router.route('/')
  .get(getCategories)
  .post(upload.single('image'), createCategory);

router.route('/:id')
  .get(getCategory)
  .put(upload.single('image'), updateCategory)
  .delete(deleteCategory);

  router.get('/:id/details', getCategoryDetails);

module.exports = router;
