import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // For now, we'll assume user is logged in as client
  // Later we'll add proper authentication
  const isAuthenticated = true;
  const userRole = 'client'; // 'client' or 'admin'

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Client Routes */}
        <Route 
          path="/client/*" 
          element={isAuthenticated && userRole === 'client' ? <ClientDashboard /> : <Navigate to="/login" />} 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        
        {/* Default Route */}
        <Route 
          path="/" 
          element={
            isAuthenticated 
              ? (userRole === 'client' ? <Navigate to="/client" /> : <Navigate to="/admin" />)
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
