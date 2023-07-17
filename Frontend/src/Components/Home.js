import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = ({ username, onLogout }) => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`https://localhost:44339/api/Administration/user-role?email=${username}`);
        const userRole = response.data;
        console.log("User Role:", userRole);
        setUserRoles([userRole]);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [username]);

  const isAdmin = userRoles.includes("Admin");
  const isManager= userRoles.includes("Manager");
  const isIT = userRoles.includes("IT");
  const isAngajat = userRoles.includes("Angajat");

  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li className='nav-link'>
            <Link to="/home">Home</Link>
          </li>
          {(isAdmin || isManager) &&(
            <>
          <li className='nav-link'>
            <Link to="/list-users">Utilizatori</Link>
          </li>
              <li className='nav-link'>
                <Link to="/assignrole">Atribuie Rol</Link>
              </li>
          <li className='nav-link'>
            <Link to="/addechipament">Adauga Echipament</Link>
          </li>
          <li className='nav-link'>
            <Link to="/listaprobari">Lista Aprobari</Link>
          </li>
          </>
           )}
           {isAngajat && (
            <>
           <li className='nav-link'>
            <Link to="/solicitari">Solicitari</Link>
          </li>
          </>
          )}
          {isIT && (
            <>
          <li className='nav-link'>
            <Link to="/aprobari">Aprobari</Link>
          </li>
          </>
         )}
        </ul>
      </nav>
      <span className="user-email">{username}</span>
      <>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </>
    </div>
  );
};

export default Home;
