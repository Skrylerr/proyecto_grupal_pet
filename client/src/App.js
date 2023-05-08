import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./registro/Login";
import Register from "./registro/Register";
import CrearPet from "./views/CrearPet";
import EditPet from "./views/EditPet";
import Main from "./views/Main";
import Mypets from "./views/Mypets";
import Navbar from "./views/Navbar";
import PetDetail from "./views/PetDetail";

function App() {
  const navigate = useNavigate();
  const Key = "Esta es mi super clave";
  const [usuario, setUsuario] = useState();
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(sessionStorage.getItem("USUARIO"))
  );

  function handleLogout() {
    sessionStorage.removeItem("USUARIO");
    setLoggedUser(null);
  }
  useEffect(() => {
    if (!usuario) {
      if (sessionStorage.getItem("USUARIO")) {
        setUsuario(JSON.parse(sessionStorage.getItem("USUARIO")));
      } else {
        navigate("/login");
      }
    } else {
      sessionStorage.setItem("USUARIO", JSON.stringify(usuario));
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <Navbar loggedUser={loggedUser} handleLogout={handleLogout} />
      </div>
      <Routes>
        <Route path="/registro" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Main loggedUser={loggedUser} />} />
        <Route path="/pets/new" element={<CrearPet />}></Route>
        <Route path="/pets/:id" element={<PetDetail />}></Route>
        <Route path="/pets/:id/edit" element={<EditPet />}></Route>
        <Route path="/pets/:userId" element={<Mypets />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
