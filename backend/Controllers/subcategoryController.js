const Subcategory = require('../model/subCategory');
const Category = require('../model/Category');

// Get all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subs = await Subcategory.find().populate('category');
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one subcategory
exports.getSubcategoryById = async (req, res) => {
  try {
    const sub = await Subcategory.findById(req.params.id).populate('category');
    if (!sub) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file?.path || null;

    const sub = new Subcategory({ name, category, image });
    const saved = await sub.save();

    // Optionally push subcategory to category.subcategories
    await Category.findByIdAndUpdate(category, { $push: { subcategories: saved._id } });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const image = req.file?.path;

    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(category && { category }),
        ...(image && { image }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Subcategory not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Subcategory not found' });

    // Remove from category
    await Category.findByIdAndUpdate(deleted.category, {
      $pull: { subcategories: deleted._id },
    });

    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
