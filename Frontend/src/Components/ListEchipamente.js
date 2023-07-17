import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListEchipamente.css'

function ListEchipamente() {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  const fetchEquipmentList = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Echipamente/ListaEchipamente');
      setEquipmentList(response.data);
    } catch (error) {
      console.error('Eroare la obținerea listei de echipamente:', error);
    }
  };

  return (
    <div className="list-echipamente-container">
      <h1>Lista de echipamente</h1>
      {equipmentList.map(equipment => (
        <div key={equipment.id}>
          <h2>{equipment.name}</h2>
          <p>{equipment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ListEchipamente;
