<<<<<<< HEAD
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
=======
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./registro/Login";
import Register from "./registro/Register";
import CrearPet from "./views/CrearPet";
import EditPet from "./views/EditPet";
import Main from "./views/Main";
import PetDetail from "./views/PetDetail";
>>>>>>> b0cf9988a5919746b4fd90cdf61988e473d3e56a

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
<<<<<<< HEAD
      <div>
        <Navbar/>
=======
      <div style={{ backgroundColor: "#7a97cf", width: "100%" }}>
        <Container>
          <Row className="mb-2">
            <Col>
              <h1 style={{ color: "white" }}>Pet Society</h1>
            </Col>
          </Row>
        </Container>
>>>>>>> b0cf9988a5919746b4fd90cdf61988e473d3e56a
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
