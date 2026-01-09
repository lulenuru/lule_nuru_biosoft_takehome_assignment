import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoutIcon from '../assets/images/logout-icon.png';

const SuperAdminMainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/superadmin/dashboard', icon: '📊' },
    { name: 'Business Owners', path: '/superadmin/businesses', icon: '🏢' },
    { name: 'Pending Approvals', path: '/superadmin/approvals', icon: '⏳' },
    { name: 'All Products', path: '/superadmin/products', icon: '📦' },
    { name: 'Users Management', path: '/superadmin/users', icon: '👥' },
    { name: 'Reports', path: '/superadmin/reports', icon: '📈' },
    { name: 'Settings', path: '/superadmin/settings', icon: '⚙️' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <h1 className="text-xl font-bold">SuperAdmin Panel</h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mt-2 rounded-lg transition-colors ${
                isActivePath(item.path)
                  ? 'bg-pink-200 text-gray-900'
                  : 'text-gray-100 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-100 hover:bg-pink-200 hover:text-gray-900 rounded-lg transition-colors"
          >
            <img src={logoutIcon} alt="Logout" className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="text-2xl">🔔</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Super Admin</p>
                <p className="text-xs text-gray-500">admin@biosoft.com</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-pink-300 flex items-center justify-center text-gray-900 font-bold">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminMainLayout;
