import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Main from './views/Main';
import CrearPet from './views/CrearPet';
import PetDetail from './views/PetDetail';
import EditPet from './views/EditPet';
import Register from './registro/Register';
import Login from './registro/Login'
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from './views/Navbar';

function App() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState();

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
        <Navbar/>
      </div>
      <Routes>
        <Route path="/registro" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Main />}></Route>
        <Route path="/pets/new" element={<CrearPet />}></Route>
        <Route path="/pets/:id" element={<PetDetail />}></Route>
        <Route path="/pets/:id/edit" element={<EditPet />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
