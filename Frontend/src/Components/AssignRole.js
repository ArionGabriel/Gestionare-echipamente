import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AssignRole = () => {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState([]);
  
    useEffect(() => {
      getUsers();
      getRoles();
    }, []);
  
    const getUsers = async () => {
      try {
        const response = await axios.get('https://localhost:44339/api/Account/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getRoles = async () => {
      try {
        const response = await axios.get('https://localhost:44339/api/Administration/roles');
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleRoleChange = (event) => {
      setSelectedRole(event.target.value);
    };
  
    const assignRole = async (userId) => {
      try {
        await axios.post(
          'https://localhost:44339/api/Administration/assign-role',
          {
            userId: userId,
            roleName: selectedRole
          }
        );
        alert('Rolul a fost atribuit cu succes!');
      } catch (error) {
        console.log(error);
        alert('A apărut o eroare la atribuirea rolului.');
      }
    };
  
    return (
      <div className="assign-role-container">
        <h2>Gestionați rolurile</h2>
        <div className="form-group">
          <label>Selecteaza un rol:</label>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="">-- Selecteaza un rol --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email}{' '}
              <button onClick={() => assignRole(user.id)}>Atribuie rol</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default AssignRole;