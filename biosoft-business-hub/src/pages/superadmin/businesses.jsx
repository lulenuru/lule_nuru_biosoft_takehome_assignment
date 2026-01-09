import React, { useState, useEffect } from 'react';
import SuperAdminMainLayout from '../../components/SuperAdminMainLayout';
import axios from 'axios';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      // TODO: Uncomment when backend is ready
      // const token = localStorage.getItem('authToken');
      // const response = await axios.get('/api/superadmin/businesses', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setBusinesses(Array.isArray(response.data) ? response.data : []);

      // Mock data for development
      setBusinesses([
        {
          id: 1,
          name: 'Tech Solutions Ltd',
          ownerName: 'John Doe',
          email: 'john@techsolutions.com',
          status: 'active',
          productCount: 25
        },
        {
          id: 2,
          name: 'Fashion Hub',
          ownerName: 'Jane Smith',
          email: 'jane@fashionhub.com',
          status: 'pending',
          productCount: 12
        },
        {
          id: 3,
          name: 'Food Delights',
          ownerName: 'Mike Johnson',
          email: 'mike@fooddelights.com',
          status: 'active',
          productCount: 40
        },
        {
          id: 4,
          name: 'Electronics Store',
          ownerName: 'Sarah Williams',
          email: 'sarah@electronics.com',
          status: 'suspended',
          productCount: 15
        },
        {
          id: 5,
          name: 'Home Decor Plus',
          ownerName: 'David Brown',
          email: 'david@homedecor.com',
          status: 'pending',
          productCount: 8
        }
      ]);
      setError('');
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setError('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (businessId, newStatus) => {
    try {
      // TODO: Uncomment when backend is ready
      // const token = localStorage.getItem('authToken');
      // await axios.patch(
      //   `/api/superadmin/businesses/${businessId}/status`,
      //   { status: newStatus },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // Mock status update for development
      setBusinesses(prevBusinesses =>
        prevBusinesses.map(business =>
          business.id === businessId
            ? { ...business, status: newStatus }
            : business
        )
      );
      alert(`Business status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update business status');
    }
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || business.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <SuperAdminMainLayout>
      <div className="space-y-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Business Owners</h1>
          <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            + Add Business
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Total Businesses</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{businesses.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {businesses.filter(b => b.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Pending</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">
              {businesses.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Suspended</p>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {businesses.filter(b => b.status === 'suspended').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Businesses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading businesses...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBusinesses.map((business) => (
                    <tr key={business.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{business.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{business.ownerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{business.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(business.status)}`}>
                          {business.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {business.productCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-pink-400 hover:text-pink-600">View</button>
                        {business.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(business.id, 'suspended')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(business.id, 'active')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBusinesses.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No businesses found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SuperAdminMainLayout>
  );
};

export default Businesses;
