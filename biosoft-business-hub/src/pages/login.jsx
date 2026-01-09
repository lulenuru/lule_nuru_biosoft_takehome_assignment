import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // To be replaced with actual backend API endpoints

      // Mock data for development
      let mockUser = null;
     
      if (formData.email === 'admin@biosoft.com' && formData.password === 'admin123') {
        mockUser = {
          token: 'mock-superadmin-token-123',
          user: {
            id: 1,
            name: 'Super Admin',
            email: 'admin@biosoft.com',
            role: 'superadmin'
          }
        };
      } else if (formData.email === 'business@biosoft.com' && formData.password === 'business123') {
        mockUser = {
          token: 'mock-business-token-456',
          user: {
            id: 2,
            name: 'Business Owner',
            email: 'business@biosoft.com',
            role: 'business_owner'
          }
        };
      } else if (formData.email === 'staff@biosoft.com' && formData.password === 'staff123') {
        mockUser = {
          token: 'mock-staff-token-789',
          user: {
            id: 3,
            name: 'Staff Member',
            email: 'staff@biosoft.com',
            role: 'staff',
            staffRole: 'Sales' 
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }

      const { token, user } = mockUser;
      
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // user role redirection
      if (user.role === 'superadmin') {
        navigate('/superadmin/dashboard');
      } else if (user.role === 'business_owner') {
        navigate('/business/dashboard');
      } else if (user.role === 'staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        'Login failed. Use: admin@biosoft.com/admin123, business@biosoft.com/business123, or staff@biosoft.com/staff123'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Biosoft Business Hub Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your marketplace
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-300 focus:border-pink-300 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-pink-300 focus:border-pink-300 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-300 focus:ring-pink-300 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-pink-400 hover:text-pink-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-pink-400 hover:text-pink-500">
                Register as Business Owner
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link to="/marketplace" className="font-medium text-blue-600 hover:text-blue-700">
                Browse Marketplace
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
