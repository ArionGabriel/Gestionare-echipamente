import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListUsers.css'

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://localhost:44339/api/Account/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='list-users-container'>
      <h2>Listă utilizatori</h2>
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
