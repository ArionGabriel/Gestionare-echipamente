import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaAprobari.css';

const ListaAprobari = () => {
  const [aprobari, setAprobari] = useState([]);
  const [solicitari, setSolicitari] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAprobari();
  }, []);

  useEffect(() => {
    fetchSolicitari();
  }, []);

  const fetchAprobari = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Aprobari/ListaAprobari');
      setAprobari(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la obținerea listei de aprobări.');
    }
  };

  const fetchSolicitari = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Solicitari/ListaSolicitari');
      setSolicitari(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la obținerea listei de solicitări.');
    }
  };

  const handleAprobareToggle = async (aprobareId) => {
    try {
      const aprobareToUpdate = aprobari.find((aprobare) => aprobare.id === aprobareId);
      const updatedAprobare = { ...aprobareToUpdate, aprobata: !aprobareToUpdate.aprobata };

      await axios.put(`https://localhost:44339/api/Aprobari/UpdateAprobare?id=${aprobareId}`, updatedAprobare);

      const updatedAprobari = aprobari.map((aprobare) => {
        if (aprobare.id === aprobareId) {
          return updatedAprobare;
        }
        return aprobare;
      });

      setAprobari(updatedAprobari);
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la actualizarea stării de aprobare.');
    }
  };

  return (
    <div className="lista-aprobari-container">
      <div>
        <h2>Lista Aprobari</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul>
          {aprobari.map((aprobare) => (
            <li key={aprobare.id}>
              <p>Descriere: {aprobare.descriere}</p>
              <p>Aprobata: {aprobare.aprobata ? 'Da' : 'Nu'}</p>
              <button onClick={() => handleAprobareToggle(aprobare.id)}>Aprobare</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Lista Solicitari</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <ul>
          {solicitari.map((solicitare) => (
            <li key={solicitare.id}>
              <p>IdSolicitare: {solicitare.id}</p>
              <p>Echipament: {solicitare.echipament.name}</p>
              <p>Descriere solicitare: {solicitare.descriere}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaAprobari;
