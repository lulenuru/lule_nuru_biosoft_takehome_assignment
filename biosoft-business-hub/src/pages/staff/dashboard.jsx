import React, { useState, useEffect } from 'react';
import StaffMainLayout from '../../components/StaffMainLayout';

const StaffDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const staffRole = user.staffRole || 'Sales';

  const [stats, setStats] = useState({
    tasksCompleted: 15,
    pendingTasks: 5,
    activeOrders: 8,
    thisMonthPerformance: 92
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Order #1234 processed', time: '30 minutes ago' },
    { id: 2, action: 'Customer query resolved', time: '1 hour ago' },
    { id: 3, action: 'Product stock updated', time: '2 hours ago' },
    { id: 4, action: 'New order assigned', time: '3 hours ago' }
  ]);

  const getRoleSpecificStats = () => {
    switch(staffRole) {
      case 'Manager':
        return [
          { label: 'Team Members', value: 8, icon: '👥', color: 'text-blue-600' },
          { label: 'Active Projects', value: 12, icon: '📁', color: 'text-green-600' },
          { label: 'Pending Approvals', value: 5, icon: '⏳', color: 'text-yellow-600' },
          { label: 'Monthly Revenue', value: '$45K', icon: '💰', color: 'text-gray-900' }
        ];
      case 'Sales':
        return [
          { label: 'Sales Today', value: 12, icon: '💰', color: 'text-green-600' },
          { label: 'Monthly Target', value: '75%', icon: '🎯', color: 'text-blue-600' },
          { label: 'Active Leads', value: 23, icon: '📞', color: 'text-yellow-600' },
          { label: 'Commission', value: '$2.5K', icon: '💵', color: 'text-gray-900' }
        ];
      case 'Support':
        return [
          { label: 'Tickets Resolved', value: 45, icon: '✅', color: 'text-green-600' },
          { label: 'Pending Tickets', value: 8, icon: '⏳', color: 'text-yellow-600' },
          { label: 'Avg Response Time', value: '15min', icon: '⏱️', color: 'text-blue-600' },
          { label: 'Satisfaction Rate', value: '98%', icon: '⭐', color: 'text-gray-900' }
        ];
      case 'Marketing':
        return [
          { label: 'Active Campaigns', value: 6, icon: '📢', color: 'text-blue-600' },
          { label: 'Reach', value: '25K', icon: '👁️', color: 'text-green-600' },
          { label: 'Engagement Rate', value: '8.5%', icon: '💬', color: 'text-yellow-600' },
          { label: 'Conversions', value: 234, icon: '✨', color: 'text-gray-900' }
        ];
      case 'Inventory':
        return [
          { label: 'Products in Stock', value: 156, icon: '📦', color: 'text-green-600' },
          { label: 'Low Stock Items', value: 12, icon: '⚠️', color: 'text-red-600' },
          { label: 'Orders to Process', value: 8, icon: '🚚', color: 'text-blue-600' },
          { label: 'Suppliers', value: 15, icon: '🏪', color: 'text-gray-900' }
        ];
      default:
        return [];
    }
  };

  const roleStats = getRoleSpecificStats();

  return (
    <StaffMainLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-200">You're logged in as {staffRole}. Here's your overview for today.</p>
        </div>

        {/* Role-based Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="text-2xl">✓</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tasks Completed</span>
                  <span className="text-sm font-medium text-gray-900">{stats.tasksCompleted}/{stats.tasksCompleted + stats.pendingTasks}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(stats.tasksCompleted / (stats.tasksCompleted + stats.pendingTasks)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Performance</span>
                  <span className="text-sm font-medium text-gray-900">{stats.thisMonthPerformance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${stats.thisMonthPerformance}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">Great job! 🎉</p>
                <p className="text-green-600 text-sm mt-1">You're performing above average this month.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">📦</span>
              <span className="text-sm font-medium text-gray-700">View Products</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">🛒</span>
              <span className="text-sm font-medium text-gray-700">Process Orders</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors">
              <span className="text-3xl mb-2">💬</span>
              <span className="text-sm font-medium text-gray-700">Messages</span>
            </button>
          </div>
        </div>
      </div>
    </StaffMainLayout>
  );
};

export default StaffDashboard;
