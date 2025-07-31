import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: "Quality First",
      description: "We source only the freshest, highest quality products for our customers."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do."
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Sustainability",
      description: "Committed to sustainable practices and supporting local farmers."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Excellence",
      description: "Striving for excellence in service and product quality."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
  About Shivamani SuperMarket
</h1>
<p className="text-xl text-gray-600 max-w-3xl mx-auto">
  Shivamani SuperMarket has been your go-to destination for fresh groceries and everyday essentials since 2020. 
  We take pride in offering high-quality products, exceptional service, and a seamless shopping experience for every household.
</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
<p className="text-gray-600 mb-6">
  Founded in 2020, <strong>Shivamani SuperMarket</strong> began as a small local grocery store with a simple mission: 
  to provide fresh, quality products to our community. What started as a family-run business 
  has now grown into a trusted supermarket serving thousands of happy customers.
</p>
<p className="text-gray-600 mb-6">
  At <strong>Shivamani SuperMarket</strong>, we believe everyone deserves access to fresh, healthy food at affordable prices. 
  That's why we work closely with local farmers and suppliers to bring you the best products while supporting the local economy.
</p>
<p className="text-gray-600">
  Today, we continue to grow and enhance our services — including online shopping and home delivery — 
  to make your grocery shopping experience faster, easier, and more convenient than ever.
</p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Our Store"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
<p className="text-xl leading-relaxed">
  At <strong>Shivamani SuperMarket</strong>, our mission is to provide our community with the freshest, highest quality groceries and products, 
  while delivering exceptional customer service. We are dedicated to supporting sustainable practices 
  that benefit both our customers and the environment, making everyday shopping a better experience for all.
</p>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;