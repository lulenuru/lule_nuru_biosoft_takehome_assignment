import React, { useState, useEffect } from 'react';
import SuperAdminMainLayout from '../../components/SuperAdminMainLayout';
import ConfirmBanner from '../../components/ConfirmBanner';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'warning',
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    password: ''
  });

  const roles = ['superadmin', 'business_owner', 'staff'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const token = localStorage.getItem('authToken');
      // const response = await axios.get('/api/superadmin/users', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Mock data
      setUsers([
        {
          id: 1,
          name: 'Super Admin',
          email: 'admin@biosoft.com',
          role: 'superadmin',
          phone: '+256700111111',
          status: 'active',
          joinDate: '2023-01-01',
          lastLogin: '2024-01-16'
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'john@techsolutions.com',
          role: 'business_owner',
          phone: '+256700123456',
          business: 'Tech Solutions Ltd',
          status: 'active',
          joinDate: '2023-06-15',
          lastLogin: '2024-01-15'
        },
        {
          id: 3,
          name: 'Jane Smith',
          email: 'jane@fashionhub.com',
          role: 'business_owner',
          phone: '+256700234567',
          business: 'Fashion Hub',
          status: 'active',
          joinDate: '2023-08-20',
          lastLogin: '2024-01-14'
        },
        {
          id: 4,
          name: 'Alice Johnson',
          email: 'alice@techsolutions.com',
          role: 'staff',
          phone: '+256700345678',
          business: 'Tech Solutions Ltd',
          staffRole: 'Manager',
          status: 'active',
          joinDate: '2023-09-10',
          lastLogin: '2024-01-15'
        },
        {
          id: 5,
          name: 'Bob Martin',
          email: 'bob@fashionhub.com',
          role: 'staff',
          phone: '+256700456789',
          business: 'Fashion Hub',
          staffRole: 'Sales',
          status: 'active',
          joinDate: '2023-10-05',
          lastLogin: '2024-01-13'
        },
        {
          id: 6,
          name: 'Mike Wilson',
          email: 'mike@foodstore.com',
          role: 'business_owner',
          phone: '+256700567890',
          business: 'Food Store',
          status: 'suspended',
          joinDate: '2023-11-12',
          lastLogin: '2024-01-10'
        }
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: '', phone: '', password: '' });
    alert('User added successfully!');
  };

  const handleToggleStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: `${newStatus === 'active' ? 'Activate' : 'Suspend'} User`,
      message: `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'suspend'} ${user.name}?`,
      onConfirm: () => {
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, status: newStatus }
            : u
        ));
      }
    });
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete User',
      message: `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`,
      onConfirm: () => {
        setUsers(users.filter(u => u.id !== userId));
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.business && user.business.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getRoleBadge = (role) => {
    const badges = {
      superadmin: 'bg-purple-100 text-purple-800',
      business_owner: 'bg-blue-100 text-blue-800',
      staff: 'bg-gray-100 text-gray-800'
    };
    return badges[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role) => {
    const labels = {
      superadmin: 'Super Admin',
      business_owner: 'Business Owner',
      staff: 'Staff'
    };
    return labels[role] || role;
  };

  return (
    <SuperAdminMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add New User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Business Owners</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {users.filter(u => u.role === 'business_owner').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Staff Members</p>
            <p className="text-4xl font-bold text-gray-600 mt-2">
              {users.filter(u => u.role === 'staff').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or business..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="business_owner">Business Owner</option>
              <option value="staff">Staff</option>
            </select>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business/Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.business || user.staffRole || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-pink-400 hover:text-pink-600">View</button>
                        {user.role !== 'superadmin' && (
                          <>
                            <button
                              onClick={() => handleToggleStatus(user.id)}
                              className={user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                            >
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No users found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+256700000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="">Select role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{getRoleLabel(role)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
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
          confirmText="Yes, Continue"
          cancelText="Cancel"
        />
      </div>
    </SuperAdminMainLayout>
  );
};

export default UsersManagement;
