import React, { useState } from 'react';
import axios from 'axios';
import './CreateRole.css'

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:44339/api/Administration', { roleName });

      if (response.status === 200) {
        console.log('Role created successfully');
        
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="create-role-container">
      <h2>Creeaza Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roleName">Nume rol:</label>
          <input
            type="text"
            id="roleName"
            className="form-control"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Create</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CreateRole;
