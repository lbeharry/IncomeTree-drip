import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If user is logged in via Firebase, show the protected content
  // If not logged in, redirect to login page
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;