import React, { useState, useEffect } from 'react';
import SuperAdminMainLayout from '../../components/SuperAdminMainLayout';
import ConfirmBanner from '../../components/ConfirmBanner';

const Approvals = () => {
  const [activeTab, setActiveTab] = useState('products'); 
  const [pendingProducts, setPendingProducts] = useState([]);
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      // Mock data
      setPendingProducts([
        {
          id: 1,
          name: 'Smart Watch Pro',
          business: 'Tech Solutions Ltd',
          businessId: 1,
          category: 'Electronics',
          price: 1100000,
          stock: 30,
          description: 'Advanced smartwatch with health tracking features',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-15',
          submittedBy: 'John Doe'
        },
        {
          id: 2,
          name: 'Running Shoes',
          business: 'Fashion Hub',
          businessId: 2,
          category: 'Fashion',
          price: 294000,
          stock: 90,
          description: 'Comfortable running shoes for daily workouts',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-14',
          submittedBy: 'Jane Smith'
        },
        {
          id: 3,
          name: 'Protein Powder',
          business: 'Health Store',
          businessId: 3,
          category: 'Food',
          price: 85000,
          stock: 50,
          description: 'High quality whey protein supplement',
          image: 'https://via.placeholder.com/150',
          submittedDate: '2024-01-13',
          submittedBy: 'Mike Johnson'
        }
      ]);

      setPendingBusinesses([
        {
          id: 6,
          businessName: 'Green Grocers',
          ownerName: 'Alice Williams',
          email: 'alice@greengrocers.com',
          phone: '+256700123456',
          category: 'Food',
          address: 'Kampala, Uganda',
          description: 'Fresh organic fruits and vegetables supplier',
          registrationDate: '2024-01-16'
        },
        {
          id: 7,
          businessName: 'Tech Innovators',
          ownerName: 'Bob Martin',
          email: 'bob@techinnovators.com',
          phone: '+256700234567',
          category: 'Electronics',
          address: 'Entebbe, Uganda',
          description: 'Innovative tech solutions and gadgets',
          registrationDate: '2024-01-15'
        }
      ]);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductApproval = (productId, action) => {
    const product = pendingProducts.find(p => p.id === productId);
    const actionText = action === 'approve' ? 'approve' : 'reject';
    
    setConfirmDialog({
      isOpen: true,
      type: action === 'approve' ? 'info' : 'warning',
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Product`,
      message: `Are you sure you want to ${actionText} "${product.name}" from ${product.business}?`,
      onConfirm: async () => {
        try {
         
          setPendingProducts(pendingProducts.filter(p => p.id !== productId));
          alert(`Product ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
        } catch (error) {
          console.error('Error updating product status:', error);
        }
      }
    });
  };

  const handleBusinessApproval = (businessId, action) => {
    const business = pendingBusinesses.find(b => b.id === businessId);
    const actionText = action === 'approve' ? 'approve' : 'reject';
    
    setConfirmDialog({
      isOpen: true,
      type: action === 'approve' ? 'info' : 'warning',
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Business`,
      message: `Are you sure you want to ${actionText} "${business.businessName}" owned by ${business.ownerName}?`,
      onConfirm: async () => {
        try {

          setPendingBusinesses(pendingBusinesses.filter(b => b.id !== businessId));
          alert(`Business ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
        } catch (error) {
          console.error('Error updating business status:', error);
        }
      }
    });
  };

  return (
    <SuperAdminMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-500 mt-1">Review and approve pending products and business registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Pending Products</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{pendingProducts.length}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Pending Businesses</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{pendingBusinesses.length}</p>
            <p className="text-xs text-gray-500 mt-1">New registrations</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'border-b-2 border-pink-300 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Products ({pendingProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('businesses')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'businesses'
                    ? 'border-b-2 border-pink-300 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Businesses ({pendingBusinesses.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : activeTab === 'products' ? (
              // Products Tab
              <div className="space-y-4">
                {pendingProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending products</p>
                  </div>
                ) : (
                  pendingProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:border-pink-300 transition-colors">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Product Image */}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full lg:w-48 h-48 object-cover rounded-lg"
                        />
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.business}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                              Pending
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">Category</p>
                              <p className="font-medium text-gray-900">{product.category}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="font-medium text-gray-900">UGX {product.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Stock</p>
                              <p className="font-medium text-gray-900">{product.stock} units</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Submitted</p>
                              <p className="font-medium text-gray-900">{product.submittedDate}</p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                          
                          <p className="text-xs text-gray-500 mb-4">Submitted by: {product.submittedBy}</p>

                          {/* Action Buttons */}
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleProductApproval(product.id, 'approve')}
                              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleProductApproval(product.id, 'reject')}
                              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                              ✗ Reject
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Businesses Tab
              <div className="space-y-4">
                {pendingBusinesses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending business registrations</p>
                  </div>
                ) : (
                  pendingBusinesses.map((business) => (
                    <div key={business.id} className="border border-gray-200 rounded-lg p-6 hover:border-pink-300 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{business.businessName}</h3>
                          <p className="text-sm text-gray-500">Owner: {business.ownerName}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                          Pending
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{business.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{business.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="font-medium text-gray-900">{business.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">{business.address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Registered</p>
                          <p className="font-medium text-gray-900">{business.registrationDate}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="text-sm text-gray-600">{business.description}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleBusinessApproval(business.id, 'approve')}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          ✓ Approve Business
                        </button>
                        <button
                          onClick={() => handleBusinessApproval(business.id, 'reject')}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          ✗ Reject Business
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Confirm Dialog */}
        <ConfirmBanner
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          type={confirmDialog.type}
          confirmText="Yes, Continue"
          cancelText="Cancel"
        />
      </div>
    </SuperAdminMainLayout>
  );
};

export default Approvals;
