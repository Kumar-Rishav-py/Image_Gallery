import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRegistering) {
      timer = setTimeout(() => {
        setIsRegistering(false);
        navigate('/');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isRegistering, navigate]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsRegistering(true);

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').add({
        email: email,
      });
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleRegistration} className="form2">
        <h2>Registration</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="butto" type="submit" disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register'}
        </button>
        <div>
          <br />
          <p>
            Already have an account? <Link to="/">Log in here</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
