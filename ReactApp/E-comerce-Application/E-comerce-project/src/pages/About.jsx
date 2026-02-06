import { FiUsers, FiAward, FiTruck, FiHeart } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: FiUsers, value: '50K+', label: 'Happy Customers' },
    { icon: FiAward, value: '100+', label: 'Awards Won' },
    { icon: FiTruck, value: '10K+', label: 'Products Delivered' },
    { icon: FiHeart, value: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EShop</h1>
            <p className="text-lg text-orange-100">
              We're on a mission to make online shopping accessible, affordable, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, EShop started with a simple idea: make quality products accessible to everyone.
              </p>
              <p>
                Our commitment to customer satisfaction has helped us build a loyal community of shoppers.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our Story"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">We carefully select every product to ensure high standards.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Love</h3>
              <p className="text-gray-600">Your satisfaction is our top priority.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Committed to reducing environmental impact.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
