import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Incometry!</h2>
      
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Name:</strong> {currentUser?.displayName || 'Not set'}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {currentUser?.email}
        </p>
        <p className="text-gray-700">
          <strong>User ID:</strong> {currentUser?.uid}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;