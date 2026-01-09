import React, { useState, useEffect } from 'react';
import SuperAdminMainLayout from '../../components/SuperAdminMainLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBusinesses: 45,
    activeBusinesses: 38,
    pendingApprovals: 7,
    totalProducts: 1250,
    totalRevenue: 125000,
    totalUsers: 340
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New business registered', business: 'Fashion Hub', time: '2 hours ago', type: 'new' },
    { id: 2, action: 'Product approved', business: 'Tech Solutions', time: '4 hours ago', type: 'approval' },
    { id: 3, action: 'Business suspended', business: 'Food Store', time: '5 hours ago', type: 'suspension' },
    { id: 4, action: 'New product submitted', business: 'Electronics Plus', time: '1 day ago', type: 'new' },
    { id: 5, action: 'Business activated', business: 'Home Decor', time: '2 days ago', type: 'approval' }
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, business: 'Fashion Hub', product: 'Summer Collection Dress', submittedBy: 'Jane Smith', date: '2024-01-15' },
    { id: 2, business: 'Tech Solutions', product: 'Wireless Mouse', submittedBy: 'John Doe', date: '2024-01-15' },
    { id: 3, business: 'Food Delights', product: 'Organic Honey', submittedBy: 'Mike Johnson', date: '2024-01-14' }
  ]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new': return '🆕';
      case 'approval': return '✅';
      case 'suspension': return '🚫';
      default: return '📝';
    }
  };

  return (
    <SuperAdminMainLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Super Admin! 👋</h1>
          <p className="text-gray-200">Here's what's happening with your marketplace today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Businesses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBusinesses}</p>
                <p className="text-green-600 text-xs mt-1">+12% from last month</p>
              </div>
              <div className="text-4xl">🏢</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Businesses</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeBusinesses}</p>
                <p className="text-green-600 text-xs mt-1">+5% from last month</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Approvals</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingApprovals}</p>
                <p className="text-red-600 text-xs mt-1">Needs attention</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                <p className="text-green-600 text-xs mt-1">+8% from last month</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-green-600 text-xs mt-1">+18% from last month</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                <p className="text-green-600 text-xs mt-1">+15% from last month</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.business}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-pink-400 hover:text-pink-600 text-sm font-medium">
              View all activities →
            </button>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Approvals</h2>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{item.product}</p>
                      <p className="text-xs text-gray-500">{item.business}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Submitted by: {item.submittedBy}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-pink-400 hover:text-pink-600 text-sm font-medium">
              View all pending →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">➕</span>
              <span className="text-sm font-medium text-gray-700">Add Business</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">👁️</span>
              <span className="text-sm font-medium text-gray-700">Review Products</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">⚙️</span>
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </SuperAdminMainLayout>
  );
};

export default Dashboard;
