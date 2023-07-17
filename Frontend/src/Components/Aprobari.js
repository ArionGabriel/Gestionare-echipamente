import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Aprobari.css';

const Aprobari = ({ username }) => {
  const [selectedSolicitareId, setSelectedSolicitareId] = useState('');
  const [descriere, setDescriere] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentSolicitare, setCurrentSolicitare] = useState(null);
  const [userId, setUserId] = useState([]);
  const [solicitari, setSolicitari] = useState([]);
  const [aprobari, setAprobari] = useState([]);
  const [allAprobari, setAllAprobari] = useState([]);
  const [isAllAprobariShown, setIsAllAprobariShown] = useState(false);

  useEffect(() => {
    const fetchAprobari = async () => {
      try {
        const response = await axios.get(`https://localhost:44339/api/Aprobari/UserAprobari?userId=${userId[0]}`);
        setAprobari(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('A apărut o eroare la obținerea listei de aprobari.');
      }
    };

    fetchAprobari();
  }, [userId]);

  useEffect(() => {
    const fetchAllAprobari = async () => {
      try {
        const response = await axios.get('https://localhost:44339/api/Aprobari/ListaAprobari');
        setAllAprobari(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('A apărut o eroare la obținerea listei complete de aprobari.');
      }
    };

    if (isAllAprobariShown) {
      fetchAllAprobari();
    }
  }, [isAllAprobariShown]);

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
    fetchSolicitari();
  }, []);

  const fetchSolicitari = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Solicitari/ListaSolicitari');
      setSolicitari(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage('A apărut o eroare la obținerea listei de solicitări.');
    }
  };

  useEffect(() => {
    const getCurrentSolicitare = async () => {
      if (!selectedSolicitareId) {
        setCurrentSolicitare(null);
        return;
      }

      try {
        const response = await axios.get(`https://localhost:44339/api/Solicitari/currentsolicitare?id=${selectedSolicitareId}`);
        setCurrentSolicitare(response.data);
      } catch (error) {
        console.error(error);
        setCurrentSolicitare(null);
        setErrorMessage('A apărut o eroare la obținerea detaliilor despre solicitare.');
      }
    };
    getCurrentSolicitare();
  }, [selectedSolicitareId]);

  const handleSolicitareIdChange = (event) => {
    setSelectedSolicitareId(event.target.value);
  };

  const handleDescriereChange = (event) => {
    setDescriere(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:44339/api/Aprobari/Create', {
        solicitareId: selectedSolicitareId,
        descriere: descriere,
        solicitari: currentSolicitare,
        userId: userId[0],
      });
      console.log(response.data);

      setSelectedSolicitareId('');
      setDescriere('');
      setErrorMessage('');

      console.log('Aprobarea a fost creată cu succes');
    } catch (error) {
      console.error(error.response);

      if (error.response && error.response.data && error.response.data.errors) {
      } else {
        setErrorMessage('A apărut o eroare la crearea aprobarii.');
      }
    }
  };

  const handleShowAllAprobari = () => {
    setIsAllAprobariShown(!isAllAprobariShown);
  };

  return (
    <div className="solicitari-container">
      <h2>Aprobari</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Solicitare:</label>
          <select value={selectedSolicitareId} onChange={handleSolicitareIdChange}>
            <option value="">-- Selectează o solicitare --</option>
            {solicitari.map((solicitare) => (
              <option key={solicitare.id} value={solicitare.id}>
                {solicitare.id}
              </option>
            ))}
          </select>
        </div>
        {currentSolicitare && (
         <div>
         <h3>Detalii despre solicitare:</h3>
         <p>Descriere: {currentSolicitare.descriere}</p>
        </div>
         )}
        <div>
          <label>Descriere:</label>
          <textarea value={descriere} onChange={handleDescriereChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="aprobare-list">
        <h3>Aprobări existente:</h3>
        {aprobari.length > 0 ? (
          <ul>
            {aprobari.map((aprobare) => (
              <li key={aprobare.id}>
                IdSolicitare: {aprobare.solicitareId}
                <br />
                Descriere: {aprobare.descriere}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nu există aprobări create pentru utilizatorul curent.</p>
        )}
      </div>
      <div className="aprobare-list">
        <h3>Toate aprobările:</h3>
        {isAllAprobariShown ? (
          allAprobari.length > 0 ? (
            <ul>
              {allAprobari.map((aprobare) => (
                <li key={aprobare.id}>
                  Utilizator: {aprobare.userId}
                  <br />
                  IdSolicitare: {aprobare.solicitareId}
                  <br />
                  Descriere: {aprobare.descriere}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nu există aprobări create.</p>
          )
        ) : (
          <button onClick={handleShowAllAprobari}>
            {isAllAprobariShown ? 'Ascunde toate aprobările' : 'Arată toate aprobările'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Aprobari;