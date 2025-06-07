const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image:{type:String},
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
});

module.exports = mongoose.model('Category', CategorySchema);
