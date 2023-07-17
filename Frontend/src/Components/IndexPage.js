import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';

const IndexPage = () => {
  return (
    <div className="index-page">
      
      <div>
        <h2>Alege o opțiune:</h2>
        <ul>
          <li>
            <Link to="/register">Înregistrare</Link>
          </li>
          <li>
            <Link to="/login">Autentificare</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
