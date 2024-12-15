import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Ana sayfada direkt olarak Login sayfasına yönlendirme */}
          <Route path="/" element={<Navigate to="/Login" />} />
          
          {/* Login sayfası */}
          <Route path="/Login" element={<Login />} />
          
          {/* Dashboard sayfası */}
          <Route path="/pages/Dashboard" element={<Dashboard />} />

          {/* Forgot Password sayfası */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
