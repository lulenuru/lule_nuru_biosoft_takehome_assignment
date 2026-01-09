import React, { useState, useEffect } from 'react';
import BusinessOwnerMainLayout from '../../components/BusinessOwnerMainLayout';

const BusinessDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 25,
    approvedProducts: 20,
    pendingProducts: 3,
    rejectedProducts: 2,
    totalStaff: 5,
    totalOrders: 150,
    revenue: 15000,
    todayOrders: 8
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: 'John Smith', product: 'Wireless Headphones', amount: 89.99, status: 'completed', date: '2024-01-15' },
    { id: 2, customer: 'Sarah Johnson', product: 'Smart Watch', amount: 299.99, status: 'processing', date: '2024-01-15' },
    { id: 3, customer: 'Mike Brown', product: 'Laptop Stand', amount: 45.00, status: 'pending', date: '2024-01-14' }
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'Wireless Headphones', sales: 145, revenue: 13055.55 },
    { id: 2, name: 'Smart Watch', sales: 89, revenue: 26699.11 },
    { id: 3, name: 'Laptop Stand', sales: 67, revenue: 3015.00 }
  ]);

  const getOrderStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <BusinessOwnerMainLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-gray-200">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                <p className="text-green-600 text-xs mt-1">{stats.approvedProducts} approved</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingProducts}</p>
                <p className="text-gray-500 text-xs mt-1">Awaiting review</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                <p className="text-green-600 text-xs mt-1">+{stats.todayOrders} today</p>
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${(stats.revenue / 1000).toFixed(1)}K</p>
                <p className="text-green-600 text-xs mt-1">+12% this month</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{order.product}</p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">${order.amount}</span>
                    <span className="text-xs text-gray-400">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-pink-400 hover:text-pink-600 text-sm font-medium">
              View all orders →
            </button>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-200 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">${product.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">➕</span>
              <span className="text-sm font-medium text-gray-700">Add Product</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">👥</span>
              <span className="text-sm font-medium text-gray-700">Manage Staff</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">View Analytics</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">⚙️</span>
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </BusinessOwnerMainLayout>
  );
};

export default BusinessDashboard;
