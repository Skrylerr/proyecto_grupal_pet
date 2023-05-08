import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import axios from "axios";
import PetCard from "../components/PetCard";
import PetMap from "../components/PetMap";

const Main = ({ loggedUser }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(false);
  const [listarPet, setListarPet] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pet", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setListarPet(res.data.datosPet);
        console.log(sessionStorage.getItem("USUARIO"));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="d-flex align-items-center mb-3">
          <img
            src="https://www.dogtime.com/assets/uploads/2022/12/GettyImages-175928868-1280x720.jpg"
            alt="Dog"
            width="50"
            height="500"
            className="me-2 img-fluid"
          />
        </Row>
        <Row className="mb-3">
          <h3 className="d-flex justify-content-center">
            Estas mascotas buscan un nuevo hogar
          </h3>
        </Row>
        <Row>
          <Col className="mb-3">
            <label htmlFor="speciesSelect" className="me-2">
              Especie:
            </label>
            <select
              id="speciesSelect"
              value={selectedSpecies}
              onChange={handleSpeciesChange}
            >
              <option value="">Todas las especies</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Hurón">Hurón</option>
              <option value="Ave">Ave</option>
              <option value="Otros">Otros</option>
            </select>
            <label htmlFor="genderSelect" className="ms-3 me-2">
              Género:
            </label>
            <select
              id="genderSelect"
              value={selectedGender}
              onChange={handleGenderChange}
            >
              <option value="">Ambos géneros</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </Col>
        </Row>
        <Row>
          <div className="d-flex flex-wrap">
            <PetCard
              datosPet={listarPet}
              selectedSpecies={selectedSpecies}
              selectedGender={selectedGender}
              userId={loggedUser?._id} // pasamos el userId del usuario logueado
            />
          </div>
        </Row>
        <Row>
          <Col>
            <PetMap
              setSelectedMarker={setSelectedMarker}
              selectedMarker={selectedMarker}
              setMapInstance={setMapInstance}
              mapInstance={mapInstance}
              zoom={15}
              initialCenter={{ lat: -12.06743, lng: -77.041307 }}
              markers={listarPet}
              mapContainerSize={"map-container-main col rounded-4"}
              className="mb-1"
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Main;
