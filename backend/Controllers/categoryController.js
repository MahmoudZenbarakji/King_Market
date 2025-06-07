const Category = require('../model/Category')
const subCategory = require('../model/subCategory')


 // Capitalized for convention
const getCategoryDetails = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId).populate({
      path: 'subcategories',
      populate: {
        path: 'products',
        model: 'Product',
      },
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category with subcategories and products', data: category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// ✅ Get all categories (with populated subcategories)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.status(200).json({
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file?.path || null;

    const category = new Category({
      name,
      image,
    });

    const saved = await category.save();
    res.status(201).json({ message: 'Category created', data: saved });
  } catch (error) {
    res.status(400).json({ message: 'Creation failed', error: error.message });
  }
};

// ✅ Get single category by ID
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('subcategories');
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category fetched', data: category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Update category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file?.path;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(image && { image }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category updated', data: updated });
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// ✅ Delete category
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails
};

