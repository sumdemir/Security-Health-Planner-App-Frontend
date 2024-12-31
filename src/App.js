import React from 'react';
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
import './App.css';


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/pages/Dashboard" element={<Dashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path = "/DietPlans" element = {<DietPlans />} />
          <Route path = "/Home" element = {<Home />} />
          <Route path = "/Dietitians" element = {<Dietitians />} />
          <Route path = "/Trainers" element = {<Trainers />} />
          <Route path= "/DietPlanning" element = {<DietPlanning />} />
          <Route path="/ChooseDietitians" element={<ChooseDietitians/>} />
          <Route path="/ChooseTrainers" element={<ChooseTrainers/>} />
          <Route path = "/TrainingPlanning" element = {<TrainingPlanning />} />

          
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
