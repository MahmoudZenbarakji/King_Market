// src/pages/Home.jsx
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import './Home.css';
import AboutCard from '../components/AboutCard';
import SocialMedia from '../components/SocialMedia';
import ProductsBar from '../components/ProductsBar';
import OurLocation from '../components/OurLocation';

export default function Home() {
  return (
    <div className="home-page">
      <HeroSlider />
      <AboutCard />
      <ProductsBar />
      <SocialMedia />
       <OurLocation /> 
    </div>
  );
}