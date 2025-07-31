import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import FeaturedProducts from './components/FeaturedProducts';
import OffersSection from './components/OffersSection';
import NewsletterSection from './components/NewsletterSection';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <OffersSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;