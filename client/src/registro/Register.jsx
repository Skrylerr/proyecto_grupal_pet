import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

const Registro = () => {

  const navigate = useNavigate();


  const crearUsuario = (e) =>{
    e.preventDefault();

    if(e.target.name.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe indicar su Nombre!',
      })
      return;
    } else if(e.target.lastName.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe indicar su Apellido!',
      })
      return;
    } else if(e.target.email.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe indicar su Email!',
      })
      return;
    } else if(e.target.password.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe ingresar su contraseña!',
      })
      return;
    } else if(e.target.confirmPassword.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe confirmar su contraseña!',
      })
      return;
    }

    var datosUsuario = {
      name: e.target.name.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    }
      axios.post("http://localhost:8000/api/newUser", datosUsuario)
      .then((resp) => {
        console.log(datosUsuario)
        if(!resp.data.error) {
          Swal.fire('¡Registro Exitoso!', "Recibirá un correo para validar su cuenta", "success")
          navigate("/login");
        } else {
          Swal.fire("Login", resp.data.mensaje, "error");
        }
      });
  };


  return (
    <Container>
      <Row className="mb-2 mt-2">
        <Col>
          <h3>Crear cuenta</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to='/login'>
            <Button className="mt-2" variant="primary" >Volver al login</Button>
          </Link>
        </Col>
      </Row>
      <Form onSubmit={crearUsuario}>
        <Row className="d-flex justify-content-center">
            <Card className="m-3" style={{ width:'40%'}}>
              <Form.Group className="mb-3" >
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text"
                  minLength={2}
                  id="name"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Apellido:</Form.Label>
                <Form.Control type="text"
                  minLength={2}
                  id="lastName"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" 
                  minLength={4}
                  id="email"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password"
                  minLength={4}
                  id="password"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Confirmar Contraseña:</Form.Label>
                <Form.Control type="password"
                  minLength={4}
                  id="confirmPassword"/>
              </Form.Group>
              <Form.Group className="mt-2">
                <Button className="mb-3" variant="primary" type="submit" >
                  Crear Usuario
                </Button>
              </Form.Group>
            </Card>
        </Row>
      </Form>
    </Container>
  )
}

export default Registro;