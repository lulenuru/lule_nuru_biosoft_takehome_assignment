import React, { useState, useEffect } from 'react';
import SuperAdminMainLayout from '../../components/SuperAdminMainLayout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
    // To be replaced with actual backend API endpoints

      // Mock data for development
      setProducts([
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          business: 'Tech Solutions Ltd',
          category: 'Electronics',
          price: 330000,
          stock: 45,
          status: 'approved',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-10'
        },
        {
          id: 2,
          name: 'Summer Collection Dress',
          business: 'Fashion Hub',
          category: 'Fashion',
          price: 220000,
          stock: 120,
          status: 'pending',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-15'
        },
        {
          id: 3,
          name: 'Organic Honey 500g',
          business: 'Food Delights',
          category: 'Food',
          price: 48000,
          stock: 200,
          status: 'approved',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-08'
        },
        {
          id: 4,
          name: 'Smart Watch Pro',
          business: 'Electronics Store',
          category: 'Electronics',
          price: 1100000,
          stock: 30,
          status: 'rejected',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-12'
        },
        {
          id: 5,
          name: 'Decorative Wall Art',
          business: 'Home Decor Plus',
          category: 'Home & Garden',
          price: 165000,
          stock: 75,
          status: 'approved',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-09'
        },
        {
          id: 6,
          name: 'Running Shoes',
          business: 'Fashion Hub',
          category: 'Fashion',
          price: 294000,
          stock: 90,
          status: 'pending',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-14'
        }
      ]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId
            ? { ...product, status: newStatus }
            : product
        )
      );
      alert(`Product status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.business.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  const categories = ['Electronics', 'Fashion', 'Food', 'Home & Garden'];

  return (
    <SuperAdminMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Total Products</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Approved</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {products.filter(p => p.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">
              {products.filter(p => p.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Rejected</p>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {products.filter(p => p.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by product name or business..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.business}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">UGX {product.price.toLocaleString()}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Stock: {product.stock} units</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-pink-100 text-pink-600 px-3 py-2 rounded text-xs font-medium hover:bg-pink-200 transition-colors">
                      View Details
                    </button>
                    {product.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(product.id, 'approved')}
                          className="flex-1 bg-green-100 text-green-600 px-3 py-2 rounded text-xs font-medium hover:bg-green-200 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(product.id, 'rejected')}
                          className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover mr-3"
                          />
                          <div className="font-medium text-gray-900">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.business}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        UGX {product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-pink-400 hover:text-pink-600">View</button>
                        {product.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(product.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(product.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No products found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SuperAdminMainLayout>
  );
};

export default Products;
