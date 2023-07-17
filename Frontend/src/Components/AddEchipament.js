import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddEchipament.css';

function AddEchipament() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipmentData = {
      name: name,
      description: description,
    };

    try {
      const response = await fetch('https://localhost:44339/api/Echipamente/CreateEquipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipmentData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setSuccessMessage('Echipament creat cu succes!');
        setName('');
        setDescription('');
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-echipament-container">
      <h1>Creare echipament</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nume:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descriere:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adăugare echipament</button>
      </form>
      <Link to="/listechipamente" className="link">
        Vezi lista de echipamente
      </Link>
    </div>
  );
}

export default AddEchipament;
