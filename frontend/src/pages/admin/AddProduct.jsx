import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [categories, setCategories] = useState([
    { id: 'meats', name: 'Meats', subcategories: ['Beef', 'Chicken', 'Lamb'] },
    { id: 'canned', name: 'Canned Food', subcategories: ['Vegetables', 'Fruits', 'Meats'] },
    { id: 'produce', name: 'Fruits & Vegetables', subcategories: ['Fruits', 'Vegetables', 'Organic'] },
    { id: 'other', name: 'Other Items', subcategories: ['Spices', 'Grains', 'Dairy'] },
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    summary: '',
    weight: '',
    price: '',
    images: [],
    imagePreviews: []
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newPreviews = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          
          // When all files are processed
          if (newPreviews.length === files.length) {
            setFormData(prev => ({
              ...prev,
              images: files,
              imagePreviews: [...prev.imagePreviews, ...newPreviews]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category name:');
    if (newCategory) {
      setCategories(prev => [
        ...prev,
        { id: newCategory.toLowerCase().replace(/\s/g, '-'), name: newCategory, subcategories: [] }
      ]);
    }
  };
  
  const handleAddSubcategory = () => {
    if (!formData.category) {
      alert('Please select a category first');
      return;
    }
    
    const newSubcategory = prompt('Enter new subcategory name:');
    if (newSubcategory) {
      setCategories(prev => prev.map(cat => {
        if (cat.id === formData.category) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, newSubcategory]
          };
        }
        return cat;
      }));
    }
  };
  
  const handleRemoveImage = (index) => {
    const newPreviews = [...formData.imagePreviews];
    newPreviews.splice(index, 1);
    
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      imagePreviews: newPreviews
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // In a real app, this would upload images to Cloudinary
    // and send the product data to your MongoDB database
    console.log('Product data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        summary: '',
        weight: '',
        price: '',
        images: [],
        imagePreviews: []
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };
  
  const selectedCategory = categories.find(cat => cat.id === formData.category);
  
  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      
      {success && (
        <div className="success-message">
          Product added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <div className="select-container">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={handleAddCategory}
                className="add-btn"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Subcategory</label>
            <div className="select-container">
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                disabled={!formData.category}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory && selectedCategory.subcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={handleAddSubcategory}
                className="add-btn"
                disabled={!formData.category}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Product Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief description of the product"
            rows="3"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Weight (optional)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 1kg, 500g"
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0.01"
              step="0.01"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Product Images</label>
          <div className="image-upload">
            {formData.imagePreviews.length > 0 ? (
              <div className="image-previews">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index}`} />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                required={formData.imagePreviews.length === 0}
              />
              <div className="upload-text">
                <div className="upload-icon">📁</div>
                <p>Click to upload images</p>
                <p className="small">(JPG, PNG, max 5MB each)</p>
              </div>
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;