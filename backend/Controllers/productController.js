const Product = require('../models/Product');
const upload = require('../middleware/upload'); // Add this import

// Create new product with image uploads
exports.createProduct = [
  upload.array('images', 10), // Now this will work
  
  async (req, res) => {
    try {
    console.log('=== PRODUCT CREATION REQUEST STARTED ===');
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      console.log('Files received:', req.files ? req.files.length : 0);
      
      // Log each file
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          console.log(`- File: ${file.originalname} (${file.size} bytes)`);
        });
      }
      const { name, description, price, weight, category, subcategory } = req.body;
            // Validate required fields
      if (!name) throw new Error('Product name is required');
      if (!description) throw new Error('Product description is required');
      if (!price) throw new Error('Product price is required');
      if (!category) throw new Error('Category is required');
      if (!subcategory) throw new Error('Subcategory is required');
      // Get image URLs from Cloudinary
      const images = req.files.map(file => {
        console.log(`Uploaded file: ${file.originalname} => ${file.path}`);
        return file.path;
      });
      
      console.log('Creating product with data:', {
        name, description, price, weight, category, subcategory, images
      });

      const product = new Product({
        name,
        description,
        price: parseFloat(price),
        weight: weight || '',
        category,
        subcategory,
        images
      });
      
      const savedProduct = await product.save();
      console.log('Product saved successfully:', savedProduct);
      
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error('!!! PRODUCT CREATION ERROR !!!');
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      res.status(500).json({ 
        message: 'Server error',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
    
  }
];

// Get all products
exports.getProducts = async (req, res) => {
  try {
    console.log('Fetching all products');
    const products = await Product.find()
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 });
      
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};
// Add this new method to the bottom
exports.getProductById = async (req, res) => {
  try {
    console.log(`Fetching product with ID: ${req.params.id}`);
    
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('Product found:', product.name);
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};