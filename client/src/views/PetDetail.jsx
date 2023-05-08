import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Swal from "sweetalert2";
import PetMap from "../components/PetMap";

const PetDetail = () => {
  const { id } = useParams();
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(false);
  const [datos, setDatos] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8000/api/pet/${id}`).then((resp) => {
      setDatos(resp.data.datosPet);
    });
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="fa fa-arrow-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="fa fa-arrow-right"></i>
      </button>
    )
  };

  const eliminar = (e) => {
    e.preventDefault();
    Swal.fire({
      text: `¿Seguro que deseas adoptar a ${datos.petName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si!!",
      confirmButtonColor: "green",
      cancelButtonText: "Lo seguire pensando",
      cancelButtonColor: "red"
    }).then((resp) => {
      if (resp.isConfirmed)
        axios
          .delete(`http://localhost:8000/api/pet/delete/${id}`)
          .then((resp) => {
            if (!resp.data.error) {
              Swal.fire(
                "Proceso completo",
                `Adoptaste a ${datos.petName}! `,
                "success"
              );
            }
            console.log(resp.data.mensaje);
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Registro", "Ha ocurrido un error al adoptar", "error");
          });
    });
  };
  if (datos) {
    return (
      <Container>
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
          </Col>
          <Col md={2} className="d-flex justify-content-end">
            <Link to="/">
              <Button className="mt-2" variant="primary">
                Volver al inicio
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mt-3">
            <Card style={{ width: "25rem" }}>
              <Slider {...settings}>
                <div>
                  <Card style={{ width: "25rem" }}>
                    <Image
                      src={`http://localhost:8000/images/${datos.linkimagen1}`}
                      rounded
                    />
                  </Card>
                </div>
                <div>
                  <Card style={{ width: "25rem" }}>
                    <Image
                      src={`http://localhost:8000/images/${datos.linkimagen2}`}
                      rounded
                    />
                  </Card>
                </div>
                <div>
                  <Card style={{ width: "25rem" }}>
                    <Image
                      src={`http://localhost:8000/images/${datos.linkimagen3}`}
                      rounded
                    />
                  </Card>
                </div>
                <div>
                  <Card style={{ width: "25rem" }}>
                    <Image
                      src={`http://localhost:8000/images/${datos.linkimagen4}`}
                      rounded
                    />
                  </Card>
                </div>
              </Slider>
            </Card>
          </Col>
          <Col>
            <div className="d-flex justify-content-between">
              <Col className="m-3">
                <Card className="p-2">
                  <h2>Mis Datos:</h2>
                  <table style={{ height: "10rem" }}>
                    <tbody>
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
                        <td>
                          {moment(new Date(datos.born)).format("YYYY-MM-DD")}
                        </td>
                      </tr>
                      <tr>
                        <td>Ubicación:</td>
                        <td>{datos.ubicacion}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </Col>
              <Col className="m-3">
                <Card className="p-2">
                  <h2>Me entregan:</h2>
                  <table style={{ height: "10rem" }}>
                    <tbody>
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
                        <td>{datos.esterilizado ? "Sí" : "No"} </td>
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
        {datos && (
          <Row>
            <PetMap
              setSelectedMarker={setSelectedMarker}
              setMapInstance={setMapInstance}
              mapInstance={mapInstance}
              zoom={15}
              markers={[datos]}
              mapContainerSize={"map-container-detail col rounded-4"}
              initialCenter={datos.coordenadas}
              selectedMarker={selectedMarker}
            />
          </Row>
        )}
      </Container>
    );
  }
};

export default PetDetail;
