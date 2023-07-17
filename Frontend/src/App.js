import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ListUsers from "./Components/ListUsers";
import Register from "./Components/Register";
import IndexPage from './Components/IndexPage';
import AssignRole from "./Components/AssignRole";
import AddEchipament from "./Components/AddEchipament";
import ListEchipamente from './Components/ListEchipamente';
import Solicitari from "./Components/Solicitari";
import Aprobari from "./Components/Aprobari";
import ListAprobari from "./Components/ListAprobari";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<IndexPage />} />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/home" replace={true} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={
              loggedIn ? (
                <Home username={username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />  
           <Route
            path="/assignrole"
            element={
              loggedIn ? <AssignRole /> : <Navigate to="/login" replace={true} />
            }
          />
           <Route
            path="/addechipament"
            element={
              loggedIn ? <AddEchipament /> : <Navigate to="/login" replace={true} />
            }
          />
           <Route
            path="/listechipamente"
            element={
              loggedIn ? <ListEchipamente /> : <Navigate to="/login" replace={true} />
            }
          />
           <Route
            path="/list-users"
            element={
              loggedIn ? <ListUsers /> : <Navigate to="/login" replace={true} />
            }
          />
            <Route
            path="/solicitari"
            element={
              loggedIn ? <Solicitari username={username} /> : <Navigate to="/login" replace={true} />
            }
          />
          <Route
            path="/aprobari"
            element={
              loggedIn ? <Aprobari username={username} /> : <Navigate to="/login" replace={true} />
            }
          />
          <Route
            path="/listaprobari"
            element={
              loggedIn ? <ListAprobari /> : <Navigate to="/login" replace={true} />
            }
          />
          
          <Route path="/register" element={<Register />} />
      
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
