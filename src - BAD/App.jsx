import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DRIPCalculator from './pages/DRIPCalculator';
import Dashboard from './pages/Dashboard';
import TFSAGuide from './pages/TFSAGuide';
import SavingMoney from './pages/SavingMoney';
import Login from './pages/Login';
import Register from './pages/Register';
import { HelmetProvider } from 'react-helmet-async';

// NEW imports
import IncomeTools from './pages/IncomeTools';
import SavingTools from './pages/SavingTools';

const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/income-tools" element={<IncomeTools />} />
          <Route path="/saving-tools" element={<SavingTools />} />
          <Route path="/tfsa/drip-calculator" element={<DRIPCalculator />} />
          <Route path="/tfsa/guide" element={<TFSAGuide />} />
          <Route path="/saving-money" element={<SavingMoney />} />

          <Route 
            path="/dashboard" 
            element={
              <div className="pt-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      🎉 Firebase Dashboard Works!
                    </h1>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Welcome back, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}!
                    </h2>
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 mb-6">
                      <h3 className="text-green-400 font-semibold mb-2">✅ Firebase Integration Complete!</h3>
                      <p className="text-white">Your authentication is working perfectly.</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Your Account Details:</h3>
                      <div className="space-y-2 text-slate-300">
                        <p><strong>Email:</strong> {currentUser?.email}</p>
                        <p><strong>Display Name:</strong> {currentUser?.displayName || 'Not set'}</p>
                        <p><strong>User ID:</strong> {currentUser?.uid}</p>
                        <p><strong>Account Created:</strong> {new Date(currentUser?.metadata?.creationTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-6 space-x-4">
                      <a href="/tfsa/drip-calculator" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                        Create Portfolio
                      </a>
                      <a href="/tfsa/guide" className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
                        Investment Guide
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <AppContent />
      </HelmetProvider>
    </AuthProvider>
  );
}
export default App;
