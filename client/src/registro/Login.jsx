import axios from "axios";
import React from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    if (e.target.email.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe ingresar su Email!"
      });
      return;
    } else if (e.target.password.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe ingresar su contraseña!"
      });
      return;
    }

    var datosUsuario = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    axios
      .post("http://localhost:8000/api/login", datosUsuario, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((resp) => {
        if (!resp.data.error) {
          sessionStorage.setItem("USUARIO", JSON.stringify(resp.data.datos));
          Swal.fire({
            icon: "success",
            text: "Datos ingresados correctamente!"
          });
          navigate("/");
        } else {
          Swal.fire("Login", resp.data.mensaje, "error");
        }
      });
  };

  return (
    <Container>
      <Form onSubmit={login}>
        <Row className="d-flex justify-content-center">
          <Card className="m-3" style={{ width: "40%" }}>
            <div className="d-flex justify-content-center mb-5">
              <h4>Iniciar sesión</h4>
            </div>
            <Form.Group className="mb-3">
              <Form.Control type="email" id="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                id="password"
                placeholder="Contreseña"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Link to="/registro">
                <h6 className="m-2">
                  ¿Aun no tienes una cuenta? Regístrate Aqui!!
                </h6>
              </Link>
            </div>
          </Card>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;

/* import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:8000/api/login",
      { email, password },
      { withCredentials: true }
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data["token"]}`;

    navigate("/");
  };

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
*/
