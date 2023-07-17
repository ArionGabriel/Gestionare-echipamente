import React, { useState } from 'react';
import axios from 'axios';
import {  Navigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [registered, setRegistered] = useState(false);

  async function save(event) {
    event.preventDefault();
    try {
      const userData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };
  
      const response = await axios.post("https://localhost:44339/api/Account/register", userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        alert("Utilizator înregistrat cu succes");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
        setRegistered(true);
        
      }
    } catch (err) {
      if (err.response && err.response.data && Array.isArray(err.response.data)) {
        setErrors(err.response.data);
      } else {
        alert(err.message);
      }
    }
  }
  if (registered) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="register-container">
      <h2>Înregistrare</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Parolă:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirmă parola:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit" onClick={save}>Înregistrare</button>
      </form>
    </div>
  );
};

export default Register;
