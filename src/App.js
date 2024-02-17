import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { auth } from './firebaseConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError("Invalid email or password"); 
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false); 
    } catch (error) {
      console.error('Sign Out Error', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={isLoggedIn ? <Login/> : <Dashboard handleSignOut={handleSignOut}/> } />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login handleLogin={handleLogin} />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
