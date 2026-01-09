import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}

export default App
