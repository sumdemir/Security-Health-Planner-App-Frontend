import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfada direkt olarak Login sayfasına yönlendirme */}
        <Route path="/" element={<Navigate to="/Login" />} />
        
        {/* Login sayfası */}
        <Route path="/Login" element={<Login />} />
        
        {/* Dashboard sayfası */}
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
