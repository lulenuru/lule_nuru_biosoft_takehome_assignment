import React, { useState, useEffect } from 'react';
import BusinessOwnerMainLayout from '../../components/BusinessOwnerMainLayout';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: ''
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    // Mock data
    setStaff([
      { id: 1, name: 'Alice Johnson', email: 'alice@business.com', role: 'Manager', phone: '+1234567890', status: 'active', joinDate: '2023-06-15' },
      { id: 2, name: 'Bob Smith', email: 'bob@business.com', role: 'Sales', phone: '+1234567891', status: 'active', joinDate: '2023-08-20' },
      { id: 3, name: 'Carol White', email: 'carol@business.com', role: 'Support', phone: '+1234567892', status: 'inactive', joinDate: '2023-09-10' }
    ]);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = {
      id: staff.length + 1,
      ...formData,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStaff([...staff, newStaff]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: '', phone: '' });
    alert('Staff member added successfully!');
  };

  const handleToggleStatus = (staffId) => {
    setStaff(staff.map(s => 
      s.id === staffId 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ));
  };

  const handleDelete = (staffId) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      setStaff(staff.filter(s => s.id !== staffId));
      alert('Staff member removed successfully');
    }
  };

  const roles = ['Manager', 'Sales', 'Support', 'Marketing', 'Inventory'];

  return (
    <BusinessOwnerMainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add Staff Member
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Total Staff</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{staff.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {staff.filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm font-medium">Inactive</p>
            <p className="text-4xl font-bold text-gray-400 mt-2">
              {staff.filter(s => s.status === 'inactive').length}
            </p>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {member.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Staff Member</h2>
              <form onSubmit={handleAddStaff} className="space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="">Select role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Add Staff
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
      </div>
    </BusinessOwnerMainLayout>
  );
};

export default StaffManagement;
