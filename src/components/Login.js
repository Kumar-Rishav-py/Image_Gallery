import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import "../App.css"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError("Invalid email or password"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleLogin} className="form1">
        <h3>Login</h3>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          id="username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="butto" type="submit" disabled={loading}> 
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p>
          Don't have an account? <Link to="/signup">Register here</Link>.
        </p>
      </form>
      {error && <div className="error">{error}</div>} 
    </div>
  );
}

export default Login;
