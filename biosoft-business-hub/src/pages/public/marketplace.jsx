import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Fashion', 'Food', 'Home & Garden', 'Sports', 'Beauty', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      // Mock data - only approved products
      setProducts([
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          business: 'Tech Solutions Ltd',
          businessId: 1,
          category: 'Electronics',
          price: 330000,
          stock: 45,
          image: 'https://via.placeholder.com/300',
          description: 'High-quality wireless headphones with noise cancellation',
          rating: 4.5,
          reviews: 124
        },
        {
          id: 2,
          name: 'Summer Collection Dress',
          business: 'Fashion Hub',
          businessId: 2,
          category: 'Fashion',
          price: 220000,
          stock: 120,
          image: 'https://via.placeholder.com/300',
          description: 'Elegant summer dress perfect for any occasion',
          rating: 4.8,
          reviews: 89
        },
        {
          id: 3,
          name: 'Organic Honey 500g',
          business: 'Food Delights',
          businessId: 3,
          category: 'Food',
          price: 48000,
          stock: 200,
          image: 'https://via.placeholder.com/300',
          description: '100% pure organic honey from local farms',
          rating: 4.9,
          reviews: 234
        },
        {
          id: 4,
          name: 'Decorative Wall Art',
          business: 'Home Decor Plus',
          businessId: 4,
          category: 'Home & Garden',
          price: 165000,
          stock: 75,
          image: 'https://via.placeholder.com/300',
          description: 'Beautiful handcrafted wall art for your home',
          rating: 4.6,
          reviews: 67
        },
        {
          id: 5,
          name: 'Running Shoes',
          business: 'Fashion Hub',
          businessId: 2,
          category: 'Fashion',
          price: 294000,
          stock: 90,
          image: 'https://via.placeholder.com/300',
          description: 'Comfortable running shoes for daily workouts',
          rating: 4.7,
          reviews: 156
        },
        {
          id: 6,
          name: 'Laptop Stand Aluminum',
          business: 'Tech Solutions Ltd',
          businessId: 1,
          category: 'Electronics',
          price: 165000,
          stock: 60,
          image: 'https://via.placeholder.com/300',
          description: 'Ergonomic laptop stand for better posture',
          rating: 4.4,
          reviews: 92
        }
      ]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.business.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Biosoft Marketplace</h1>
              <p className="text-sm text-gray-500">Shop from verified businesses</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-pink-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-pink-400 transition-colors text-sm"
              >
                Register Business
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search products or businesses..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category === 'All' ? 'all' : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (filterCategory === 'all' && category === 'All') || filterCategory === category
                    ? 'bg-pink-300 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Low Stock
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-gray-500">{product.business}</p>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500 text-sm mr-1">{renderStars(product.rating)}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">UGX {product.price.toLocaleString()}</span>
                    <button 
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-pink-300 text-gray-900 hover:bg-pink-400'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Biosoft Business Hub</h3>
            <p className="text-gray-400 text-sm">Your trusted marketplace for quality products</p>
            <div className="mt-4 space-x-4">
              <Link to="/" className="text-pink-300 hover:text-pink-400">Login</Link>
              <Link to="/register" className="text-pink-300 hover:text-pink-400">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
