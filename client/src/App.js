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
      <div style={{ backgroundColor: "#7a97cf", width: "100%" }}>
        <Container>
          <Row className="mb-2">
            <Col>
              <h1 style={{ color: "white" }}>Pet Society</h1>
            </Col>
          </Row>
        </Container>
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
