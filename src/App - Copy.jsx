import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DRIPCalculator from './pages/DRIPCalculator';
import Dashboard from './pages/Dashboard';
import TFSAGuide from './pages/TFSAGuide';
import SavingMoney from './pages/SavingMoney';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tfsa/drip-calculator" element={<DRIPCalculator />} />
            <Route path="/tfsa/guide" element={<TFSAGuide />} />
            <Route path="/saving-money" element={<SavingMoney />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;