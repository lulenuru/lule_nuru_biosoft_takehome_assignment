import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessOwnerMainLayout from '../../components/BusinessOwnerMainLayout';
import ConfirmBanner from '../../components/ConfirmBanner';

const BusinessProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Mock data for development
      setProducts([
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          category: 'Electronics',
          price: 330000,
          stock: 45,
          status: 'approved',
          image: 'https://via.placeholder.com/150',
          sales: 145
        },
        {
          id: 2,
          name: 'Smart Watch Pro',
          category: 'Electronics',
          price: 1100000,
          stock: 30,
          status: 'pending',
          image: 'https://via.placeholder.com/150',
          sales: 89
        },
        {
          id: 3,
          name: 'Laptop Stand Aluminum',
          category: 'Accessories',
          price: 165000,
          stock: 0,
          status: 'approved',
          image: 'https://via.placeholder.com/150',
          sales: 67
        },
        {
          id: 4,
          name: 'USB-C Hub',
          category: 'Electronics',
          price: 147000,
          stock: 120,
          status: 'rejected',
          image: 'https://via.placeholder.com/150',
          sales: 0
        }
      ]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (productId) => {
    const product = products.find(p => p.id === productId);
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Product',
      message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      onConfirm: () => {
        setProducts(products.filter(p => p.id !== productId));
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <BusinessOwnerMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <button 
            onClick={() => navigate('/business/add-product')}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add New Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <p className="text-gray-500 text-sm font-medium">Out of Stock</p>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {products.filter(p => p.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 min-w-[200px]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-gray-900">UGX {product.price.toLocaleString()}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3 text-xs text-gray-600">
                    <span>Stock: {product.stock}</span>
                    <span>Sales: {product.sales}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-pink-100 text-pink-600 px-3 py-2 rounded text-xs font-medium hover:bg-pink-200 transition-colors">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}

        {/* Confirm Dialog */}
        <ConfirmBanner
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          type={confirmDialog.type}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      </div>
    </BusinessOwnerMainLayout>
  );
};

export default BusinessProducts;
