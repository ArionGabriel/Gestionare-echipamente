import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/list-users">List Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;