import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import DepartmentDetails from './components/DepartmentDetails';
function App() {
  const [userDetails, setUserDetails] = useState(() => {
    // Try to get user details from localStorage on initial load
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });

  // Add a logout function to clear localStorage
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route 
          path="/login" 
          element={<Login setUserDetails={setUserDetails} />} 
        />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/home" 
            element={userDetails ? <Homepage userDetails={userDetails} /> : <Navigate to="/login" replace />} 
          />
          <Route path="/department/:department" element={<DepartmentDetails userDetails={userDetails} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;