import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Swal from "sweetalert2";



const PetDetail = () =>{

  const {id} = useParams();
  const [datos, setDatos] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pet/${id}`)
    .then(resp => {
      setDatos(resp.data.datosPet)
    })
  }, [id])

  const eliminar = (e) => {
    e.preventDefault();
    Swal.fire({
      text: `¿Seguro que deseas adoptar a ${datos.petName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si!!',
      confirmButtonColor: 'green',
      cancelButtonText: 'Lo seguire pensando',
      cancelButtonColor:'red'
    }).then(resp => { 
      if(resp.isConfirmed)
        axios.delete(`http://localhost:8000/api/pet/delete/${id}`)
          .then(resp => {
            if(!resp.data.error) {
              Swal.fire('Proceso completo',`Adoptaste a ${datos.petName}! `, "success")
            }
            console.log(resp.data.mensaje)
            navigate("/");
          })
          .catch(error => {
            console.log(error)
            Swal.fire('Registro', "Ha ocurrido un error al adoptar", "error");
          })
      })
}

  return (
    <Container >
      <Row className="mt-2">
        <Col>
          <h2 className="mt-1">
            <span>{datos.petName}</span>
          </h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="mt-2" variant="success" onClick={eliminar}>
          ¡Quiero adoptar a {datos.petName}!
          </Button>
        </Col >
        <Col md={2} className="d-flex justify-content-end">
          <Link to='/'>
            <Button className="mt-2" variant="primary" >Volver al inicio</Button>
          </Link>
        </Col>
      </Row>
      <Row >
        <Col md={4} className="mt-3" >
          <Card style={{ width:'25rem'}}>
            <Image src={datos.linkimagen} rounded />
          </Card>
        </Col>
        <Col>
          <div className="d-flex justify-content-between">
            <Col className="m-3">
              <Card className="p-2">
                <h2>Mis Datos:</h2>
                <table style={{ height:"10rem"}}>
                  <tbody >
                    <tr>
                      <td>Especie:</td>
                      <td>{datos.type} </td>
                    </tr>
                    <tr>
                      <td>Sexo:</td>
                      <td>{datos.gender} </td>
                    </tr>
                    <tr>
                      <td>Fecha de nacimiento:</td>
                      <td>{moment(new Date(datos.born)).format('YYYY-MM-DD')}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </Col>
            <Col className="m-3">
              <Card className="p-2">
                <h2>Me entregan:</h2>
                <table style={{ height:"10rem"}} >
                    <tbody >
                      <tr>
                        <td>Vacunado:</td>
                        <td>{datos.vacunado ? "Sí" : "No"} </td>
                      </tr>
                      <tr>
                        <td>Desparasitado:</td>
                        <td>{datos.desparasitado ? "Sí" : "No"} </td>
                      </tr>
                      <tr>
                        <td>Esterilizado:</td>
                        <td>{datos.esterilizado ? "Sí" : "No" }  </td>
                      </tr>
                      <tr>
                        <td>Microchip:</td>
                        <td>{datos.microchip ? "Sí" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Identificado:</td>
                        <td>{datos.identificado ? "Sí" : "No"}</td>
                      </tr>
                    </tbody>
                  </table>
              </Card>
            </Col>
          </div>
          <div className="m-3">
            <Card className="p-2">
              <h2>Descripción:</h2>
              <p>{datos.description}</p>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PetDetail;