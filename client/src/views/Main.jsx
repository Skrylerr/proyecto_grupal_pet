import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import PetCard from "../components/PetCard";
import axios from "axios";
import Swal from "sweetalert2";

const Main = () => {

  const navigate = useNavigate();
  const [listarPet, setListarPet] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/api/pet')
      .then(res => {
        console.log(res.data.datosPet)
        setListarPet(res.data.datosPet)
      })
      }, [])

      const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada correctamente',
        })
        navigate('/login');
    }


  return(
    <React.Fragment>
      <Container>
        <Row className="mb-2">
          <Col className="mb-3 mt-2">
            <h3>Estas mascotas buscan un nuevo hogar</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to='/pets/new'>
              <Button className="mt-2" variant="primary" >Dar en adopcíon</Button>
            </Link>
          </Col>
          <Col className="mt-2" md={2}>
            <Button className='btn btn-danger' onClick={salir}>Cerrar sesión</Button>
          </Col>
        </Row>
        <Row>
          <div className="d-flex flex-wrap">
              <PetCard datosPet={listarPet}/>
          </div>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Main;