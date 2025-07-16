import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

// Simplified PrivateRoute for testing
const SimplePrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  console.log('SimplePrivateRoute currentUser:', currentUser);
  
  if (currentUser) {
    return children;
  } else {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Access Denied - Firebase Says Not Logged In</h2>
        <p>currentUser is: {String(currentUser)}</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    );
  }
};

const AppContent = () => {
  const { currentUser } = useAuth();
  
  console.log('App currentUser:', currentUser);
  
  return (
    <div className="min-h-screen gradient-bg">
      {/* Simple debug info */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'red', 
        color: 'white',
        padding: '10px', 
        zIndex: 9999 
      }}>
        {currentUser ? `LOGGED IN: ${currentUser.email}` : 'NOT LOGGED IN'}
      </div>
      
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
              <SimplePrivateRoute>
                <Dashboard />
              </SimplePrivateRoute>
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
      <AppContent />
    </AuthProvider>
  );
}

export default App;