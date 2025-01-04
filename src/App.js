import React, { Profiler } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import ForgotPassword from './pages/ForgotPassword';
import DietPlans from './pages/Dashboard/DietPlans';
import Home from './pages/Dashboard/Home';
import Dietitians from './pages/Dashboard/Dietitians';
import Trainers from './pages/Dashboard/Trainers';
import DietPlanning from './pages/Dashboard/DietPlanning';
import ChooseDietitians from './pages/Dashboard/ChooseDietitians';
import ChooseTrainers from './pages/Dashboard/ChooseTrainers';
import TrainingPlanning from './pages/Dashboard/TrainingPlanning';
import TrainingPlanResponse from './pages/Dashboard/TrainingPlanResponse';
import DietPlanResponse from './pages/Dashboard/DietPlanResponse';
import Profile from './pages/Dashboard/Profile';
import Register from './pages/Register';
import Sidebar from './components/Layouts/Sidebar';
import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const userFirstName = localStorage.getItem('userFirstName');
    const userLastName = localStorage.getItem('userLastName');

    if (userFirstName && userLastName) {
      setUser({
        firstname: userFirstName,
        lastname: userLastName,
      });
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Login ve Genel Rotalar */}
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Register" element={<Register />} />

          {/* Dashboard ve Alt Rotalar */}
          <Route
            path="/Dashboard/*"
            element={
              <div style={{ display: 'flex', height: '100vh' }}>
                <Sidebar user={user} onLogout={handleLogout} />
                <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="DietPlans" element={<DietPlans />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Dietitians" element={<Dietitians />} />
                    <Route path="Trainers" element={<Trainers />} />
                    <Route path="DietPlanning" element={<DietPlanning />} />
                    <Route path="ChooseDietitians" element={<ChooseDietitians />} />
                    <Route path="ChooseTrainers" element={<ChooseTrainers />} />
                    <Route path="TrainingPlanning" element={<TrainingPlanning />} />
                    <Route path="TrainingPlanResponse" element={<TrainingPlanResponse />} />
                    <Route path="DietPlanResponse" element={<DietPlanResponse />} />
                    <Route path="Profile" element={<Profile />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
