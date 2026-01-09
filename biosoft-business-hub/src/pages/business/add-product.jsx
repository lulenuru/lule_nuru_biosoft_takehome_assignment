import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessOwnerMainLayout from '../../components/BusinessOwnerMainLayout';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    specifications: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Electronics', 'Fashion', 'Food', 'Home & Garden', 'Sports', 'Beauty', 'Accessories'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API endpoint
      // const token = localStorage.getItem('authToken');
      // const response = await axios.post('/api/business/products', formData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      alert('Product submitted successfully! Waiting for admin approval.');
      navigate('/business/products');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BusinessOwnerMainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <button
            onClick={() => navigate('/business/products')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Products
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter available quantity"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Describe your product..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">
                Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Enter product specifications (optional)"
                value={formData.specifications}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-500">
                <span className="text-4xl mb-2 block">📷</span>
                <p className="mb-2">Click to upload or drag and drop</p>
                <p className="text-xs">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="images"
              />
              <label
                htmlFor="images"
                className="mt-4 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-200"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/business/products')}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </BusinessOwnerMainLayout>
  );
};

export default AddProduct;
