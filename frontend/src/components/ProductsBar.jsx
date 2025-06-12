import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Product from './Product';
import './ProductsBar.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProductsBar = () => {
  const sectionRef = useRef(null);
  const categoriesRef = useRef([]);
  const productsRef = useRef(null);
  
  // Mock categories (in a real app, these would come from an API)
  const categories = [
    { id: 'meats', name: 'Meats', icon: '🥩' },
    { id: 'canned', name: 'Canned Food', icon: '🥫' },
    { id: 'produce', name: 'Fruits & Vegetables', icon: '🥦' },
    { id: 'other', name: 'Other Items', icon: '📦' }
  ];
  
  // Mock products data (in a real app, these would come from MongoDB)
  const allProducts = [
    { id: 1, name: 'Fresh Beef', price: 12.99, category: 'meats', image: 'beef.jpg' },
    { id: 2, name: 'Organic Chicken', price: 8.99, category: 'meats', image: 'chicken.jpg' },
    { id: 3, name: 'Canned Beans', price: 1.99, category: 'canned', image: 'beans.jpg' },
    { id: 4, name: 'Canned Corn', price: 1.49, category: 'canned', image: 'corn.jpg' },
    { id: 5, name: 'Fresh Apples', price: 2.99, category: 'produce', image: 'apples.jpg' },
    { id: 6, name: 'Organic Carrots', price: 1.29, category: 'produce', image: 'carrots.jpg' },
    { id: 7, name: 'Rice 5kg', price: 5.99, category: 'other', image: 'rice.jpg' },
    { id: 8, name: 'Pasta Pack', price: 3.49, category: 'other', image: 'pasta.jpg' },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  
  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = allProducts.filter(
          product => product.category === selectedCategory
        );
        setProducts(filtered);
        setLoading(false);
      }, 800);
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategory]);
  
  // Animation on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    gsap.fromTo(section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate categories
    categoriesRef.current.forEach((category, i) => {
      gsap.fromTo(category,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );
    });
    
    // Animate products container
    gsap.fromTo(productsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      }
    );
  }, []);
  
  const toggleCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(categoryId);
    }
  };
  
  return (
    <section ref={sectionRef} className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        
        <div className="products-container">
          <div className="categories-sidebar">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                ref={el => categoriesRef.current[index] = el}
                className={`category-circle ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
          
          <div ref={productsRef} className="products-grid">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : (
              products.map(product => (
                <Product key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsBar;