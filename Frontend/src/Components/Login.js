
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  async function handleLogin(event) {
    event.preventDefault();
  
    try {
      const userData = {
        email: email,
        password: password
      };
  
      const response = await axios.post("https://localhost:44339/api/Account/login", userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        alert("Utilizator logat cu succes");
        setErrors([]);
        onLogin(email); 
      }
    } catch (err) {
      if (err.response && err.response.data && Array.isArray(err.response.data)) {
        setErrors(err.response.data);
      } else {
        alert(err.message);
      }
    }
  }
  
  
  return (
    <div className="register-container">
      <h2>Autentificare</h2>
      {errors.length > 0 && (
        <div className="error-message">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Parolă:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Autentificare</button>
      </form>
    </div>
  );
};

export default Login;

