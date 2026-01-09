import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import ForgotPassword from './pages/forgot-password'
import Marketplace from './pages/public/marketplace'
import Dashboard from './pages/superadmin/dashboard'
import Businesses from './pages/superadmin/businesses'
import Products from './pages/superadmin/products'
import BusinessDashboard from './pages/business/dashboard'
import BusinessProducts from './pages/business/products'
import AddProduct from './pages/business/add-product'
import StaffManagement from './pages/business/staff'
import StaffDashboard from './pages/staff/dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/superadmin/dashboard" element={<Dashboard />} />
        <Route path="/superadmin/businesses" element={<Businesses />} />
        <Route path="/superadmin/products" element={<Products />} />
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/products" element={<BusinessProducts />} />
        <Route path="/business/add-product" element={<AddProduct />} />
        <Route path="/business/staff" element={<StaffManagement />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}

export default App
