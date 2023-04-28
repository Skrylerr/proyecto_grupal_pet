import axios from "axios";
import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {

  const navigate = useNavigate();


  const login = (e) =>{
    e.preventDefault();

    if(e.target.email.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe ingresar su Email!',
      })
      return;
    } else if(e.target.password.value === ""){
      Swal.fire({
        icon: 'error',
        text: 'Debe ingresar su contraseña!',
      })
      return;
    }

    var datosUsuario = {
      email: e.target.email.value,
      password: e.target.password.value
    }
      axios.post("http://localhost:8000/api/login", datosUsuario)
      .then(resp => {
        if(!resp.data.error) {
            sessionStorage.setItem('USUARIO', JSON.stringify(resp.data.datos));
            Swal.fire({
              icon: 'success',
              text: 'Datos ingresados correctamente!'
            });
            navigate('/');
          } else {
            Swal.fire('Login', resp.data.mensaje, "error");
        }
    })
  }

  return ( 
    <Container>
        <Form onSubmit={login}>
          <Row className="d-flex justify-content-center">
              <Card className="m-3" style={{ width:'40%'}}>
                <div className="d-flex justify-content-center mb-5">
                  <h4>Iniciar sesión</h4>
                </div>
                <Form.Group className="mb-3" >
                  <Form.Control type="email"
                    id="email"
                    placeholder="Email"/>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Control type="password"
                    id="password"
                    placeholder="Contreseña"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Link to='/registro'>
                    <h6 className="m-2">¿Aun no tienes una cuenta? Regístrate Aqui!!</h6>
                  </Link>
                </div>
              </Card>
          </Row>
        </Form>
    </Container>
  )
}

export default Login;