const Product = require('../model/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').exec();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createProducts = async (req, res) => {
  try {
    const imageUrl = req.file?.path; // Cloudinary URL or multer path
    const { name, description, price, category, subcategory } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      image: imageUrl,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getProducts,
  createProducts,
  updateProduct,
  getProduct,
  deleteProduct,
};
