import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import PetCard from "../components/PetCard";
import PetMap from "../components/PetMap";

const Main = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const navigate = useNavigate();
  const [listarPet, setListarPet] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

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

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
  }

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  }

  // const onMapClick = (e) => {
  //   if (window.confirm(`Are you sure you want to mark this coordinates?`)) {
  //     setLat(e.latLng.lat());
  //     setLng(e.latLng.lng());
  //   }
  // };

  return (
    <React.Fragment>
      <Container>
      <Row className="d-flex align-items-center mb-3">
        <img src="https://www.dogtime.com/assets/uploads/2022/12/GettyImages-175928868-1280x720.jpg" alt="Dog" width="50" height="500"  className="me-2 img-fluid"/>
      </Row>
        <Row className="mb-2">
          <Col className="mb-3">
          <h3>Estas mascotas buscan un nuevo hogar</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Link to="/pets/new">
              <Button className="mt-2" variant="primary">
                Dar en adopcíon
              </Button>
            </Link>
          </Col>
          <Col className="mt-2" md={2}>
            <Button className="btn btn-danger" onClick={salir}>
              Cerrar sesión
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <label htmlFor="speciesSelect" className="me-2">Especie:</label>
            <select id="speciesSelect" value={selectedSpecies} onChange={handleSpeciesChange}>
              <option value="">Todas las especies</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Hurón">Hurón</option>
              <option value="Ave">Ave</option>
              <option value="Otros">Otros</option>
            </select>
            <label htmlFor="genderSelect" className="ms-3 me-2">Género:</label>
            <select id="genderSelect" value={selectedGender} onChange={handleGenderChange}>
              <option value="">Ambos géneros</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </Col>
        </Row>
        <Row>
          <div className="d-flex flex-wrap">
            <PetCard datosPet={listarPet} selectedSpecies={selectedSpecies} selectedGender={selectedGender} />
          </div>
        </Row>
        <Row>
          <Col>
            <PetMap
              setSelectedMarker={setSelectedMarker}
              setMapInstance={setMapInstance}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Main;
