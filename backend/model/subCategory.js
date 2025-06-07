const mongoose = require("mongoose")
const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});
module.exports = mongoose.model('Subcategory', SubcategorySchema);