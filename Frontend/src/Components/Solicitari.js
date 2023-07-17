import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Solicitari.css';

const Solicitari = ({ username }) => {
  const [echipamente, setEchipamente] = useState([]);
  const [selectedEchipamentId, setSelectedEchipamentId] = useState('');
  const [descriere, setDescriere] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentEchipament, setCurrentEchipament] = useState(null);
  const [userId, setUserId] = useState([]);
  const [solicitari, setSolicitari] = useState([]);

  useEffect(() => {
    const fetchSolicitari = async () => {
      try {
        const response = await axios.get(`https://localhost:44339/api/Solicitari/UserSolicitari?userId=${userId[0]}`);
        setSolicitari(response.data);
      } catch (error) {
        console.error('Error fetching solicitari:', error);
      }
    };

    fetchSolicitari();
  }, [userId]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`https://localhost:44339/api/Account/currentuserid?email=${username}`);
        const userId = response.data;
        console.log('User Id:', userId);
        setUserId([userId]);
      } catch (error) {
        console.error('Error fetching user Id:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    fetchEchipamente();
  }, []);

  const fetchEchipamente = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Echipamente/ListaEchipamente');
      setEchipamente(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la obținerea listei de echipamente.');
    }
  };

  useEffect(() => {
    const getCurrentEchipament = async () => {
      if (!selectedEchipamentId) {
        setCurrentEchipament(null);
        return;
      }

      try {
        const response = await axios.get(
          `https://localhost:44339/api/Echipamente/currentEchipament?id=${selectedEchipamentId}`
        );
        setCurrentEchipament(response.data);
      } catch (error) {
        console.error(error);
        setCurrentEchipament(null);
        setErrorMessage('A apărut o eroare la obținerea detaliilor despre echipament.');
      }
    };
    getCurrentEchipament();
  }, [selectedEchipamentId]);

  const handleEchipamentIdChange = (event) => {
    setSelectedEchipamentId(event.target.value);
  };

  const handleDescriereChange = (event) => {
    setDescriere(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:44339/api/Solicitari/Create', {
        echipamentId: selectedEchipamentId,
        descriere: descriere,
        echipament: currentEchipament,
        userId: userId[0],
      });
      console.log(response.data);

      setSelectedEchipamentId('');
      setDescriere('');
      setErrorMessage('');
      const echipamentNume = echipamente.find((e) => e.id === selectedEchipamentId)?.name;
      console.log('Solicitarea a fost creată cu succes');

      
      
    } catch (error) {
      console.error(error.response);

      if (error.response && error.response.data && error.response.data.errors) {
      } else {
        setErrorMessage('A apărut o eroare la crearea solicitării.');
      }
    }
  };

  return (
    <div className="solicitari-container">
      <h2>Solicitari</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Echipament:</label>
          <select value={selectedEchipamentId} onChange={handleEchipamentIdChange}>
            <option value="">-- Selectează un echipament --</option>
            {echipamente.map((echipament) => (
              <option key={echipament.id} value={echipament.id}>
                {echipament.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descriere:</label>
          <textarea value={descriere} onChange={handleDescriereChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {solicitari.length > 0 ? (
        <div>
          <h2>Solicitări deja făcute:</h2>
          <ul>
            {solicitari.map((solicitare) => (
              <li key={solicitare.id}>
                Echipament: {echipamente.find((e) => e.id === solicitare.echipamentId)?.name}
                <br />
                Descriere: {solicitare.descriere}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Nu există solicitări făcute.</p>
      )}
    </div>
  );
};

export default Solicitari;
