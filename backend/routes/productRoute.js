const express = require('express')
const router = express.Router()
const upload = require('../utils/storage');
const {
    getProducts,
    createProducts,
    updateProduct,
    getProduct,
    deleteProduct
    }=require('../Controllers/productController')

router.route('/')
  .get(getProducts)
  .post(upload.single('image'), createProducts);

router.route('/:id').get(getProduct).patch(upload.single('image'),updateProduct).delete(deleteProduct)

module.exports = router