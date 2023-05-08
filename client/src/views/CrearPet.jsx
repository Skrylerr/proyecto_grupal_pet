import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressAndMap from "../components/AddressAndMap";
import PetImageInput from "../components/Cropper/PetImageInput";

const CrearPet = () => {
  const navigate = useNavigate();
  const [isCropperDisplayed, setIsCropperDisplayed] = useState(false);

  const [vacunado, setVacunado] = useState(false);
  const [desparasitado, setDesparasitadoo] = useState(false);
  const [esterilizado, setEsterilizado] = useState(false);
  const [microchip, setMicrochip] = useState(false);
  const [identificado, setIdentificado] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  var formData = new FormData();
  const putImage1 = (file) => {
    setImage1(file);
    console.log("Image was appended to form");
  };
  const putImage2 = (file) => {
    setImage2(file);
    console.log("Image was appended to form");
  };
  const putImage3 = (file) => {
    setImage3(file);
    console.log("Image was appended to form");
  };
  const putImage4 = (file) => {
    setImage4(file);
    console.log("Image was appended to form");
  };

  const crearPet = async (e) => {
    e.preventDefault();
    console.log("hello wrods");
    if (e.target.petName.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe indicar el nombre de la mascota!"
      });
      return;
    } else if (e.target.type.value === "Selecciona...") {
      Swal.fire({
        icon: "error",
        text: "Debe indicar la especie de la mascota!"
      });
      return;
    } else if (e.target.gender.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe indicar el sexo de la mascota!"
      });
      return;
    } else if (e.target.born.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe indicar la fecha de nacimiento de la mascota!"
      });
      return;
    } else if (e.target.description.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe agregar una descripcion de la mascota!"
      });
      return;
    } else if (image1 === false) {
      console.log("hey1");
      Swal.fire({
        icon: "error",
        text: "Debe agregar la foto de perfil de la mascota!"
      });
      return;
    } else if (image2 === false) {
      console.log("hey2");
      Swal.fire({
        icon: "error",
        text: "Debe agregar una foto más!"
      });
      return;
    } else if (image3 === false) {
      console.log("hey3");
      Swal.fire({
        icon: "error",
        text: "Debe agregar una foto más!"
      });
      return;
    } else if (image4 === false) {
      console.log("hey4");
      Swal.fire({
        icon: "error",
        text: "Debe agregar una foto más!"
      });
      return;
    } else if (e.target.ubicacion.value === "") {
      Swal.fire({
        icon: "error",
        text: "Debe agregar la ubicación de la mascota!"
      });
      return;
    }
    const address = e.target.ubicacion.value;
    const results = await getGeocode({ address });
    const coords = await getLatLng(results[0]);
    formData.append("petName", e.target.petName.value);
    formData.append("type", e.target.type.value);
    formData.append("gender", e.target.gender.value);
    formData.append("born", e.target.born.value);
    formData.append("description", e.target.description.value);
    formData.append("vacunado", e.target.vacunado.checked);
    formData.append("desparasitado", e.target.desparasitado.checked);
    formData.append("esterilizado", e.target.esterilizado.checked);
    formData.append("microchip", e.target.microchip.checked);
    formData.append("identificado", e.target.identificado.checked);
    formData.append("linkimagen1", image1);
    formData.append("linkimagen2", image2);
    formData.append("linkimagen3", image3);
    formData.append("linkimagen4", image4);
    formData.append("ubicacion", e.target.ubicacion.value);
    formData.append(
      "coordenadas",
      `{ "lat": ${coords.lat}, "lng": ${coords.lng} }`
    );
    const token = document.cookie.split("=")[1]; // JWT token from cookie
    formData.append("token", token);

    axios
      .post("http://localhost:8000/api/pet/new", formData)
      .then((resp) => {
        if (!resp.data.error) {
          Swal.fire(
            "En adopcion",
            "Los datos se guardaron exitósamente!",
            "success"
          );
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Registro",
          "Ha ocurrido un error al regitrar la mascota!",
          "error"
        );
      });
  };

  return (
    <Container>
      <Row>
        <Col className="mb-3 mt-2">
          <h3>Dar en adopción</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to="/">
            <Button className="mt-2" variant="primary">
              Volver al inicio
            </Button>
          </Link>
        </Col>
      </Row>
      <Form onSubmit={crearPet}>
        <Card>
          <Row className="px-3">
            <Col className="m-3">
              <div className="mb-3">
                <h4>
                  <span>Datos:</span>
                </h4>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  minLength={3}
                  id="petName"
                  style={{ width: "200px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Especie:</Form.Label>
                <Form.Select required id="type" style={{ width: "150px" }}>
                  <option defaultValue>Selecciona...</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Conejo">Conejo</option>
                  <option value="Hurón">Hurón</option>
                  <option value="Ave">Ave</option>
                  <option value="Otros">Otros</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <div>
                  <Form.Label>Sexo:</Form.Label>
                </div>
                <Form.Check
                  inline
                  label="Macho"
                  name="gender"
                  type="radio"
                  value="Macho"
                />
                <Form.Check
                  inline
                  label="Hembra"
                  name="gender"
                  type="radio"
                  value="Hembra"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha nacimiento (Aprox.):</Form.Label>
                <Form.Control
                  type="date"
                  minLength={3}
                  id="born"
                  style={{ width: "150px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pet Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  minLength={5}
                  id="description"
                  style={{ height: "100px", width: "300px" }}
                />
              </Form.Group>
            </Col>
            <Col className="m-3">
              <div className="mb-3">
                <h4>
                  <span>Se entrega:</span>
                </h4>
              </div>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Vacunado"
                  id="vacunado"
                  onChange={(e) => {
                    setVacunado(e.target.checked);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Desparasitado"
                  id="desparasitado"
                  onChange={(e) => setDesparasitadoo(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Esterilizado"
                  id="esterilizado"
                  onChange={(e) => setEsterilizado(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Microchip"
                  id="microchip"
                  onChange={(e) => setMicrochip(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Identificado"
                  id="identificado"
                  onChange={(e) => setIdentificado(e.target.checked)}
                />
              </Form.Group>
              <div className="mt-3">
                <Form.Group>
                  {/* SECCION DE FOTOS DE PERFIL */}
                  <Form.Label>Imagen 1:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen1"}
                    putImage={putImage1}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 2:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen2"}
                    putImage={putImage2}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 3:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen3"}
                    putImage={putImage3}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 4:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen4"}
                    putImage={putImage4}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <AddressAndMap isCropperDisplayed={isCropperDisplayed} />
              </Form.Group>
            </Col>
          </Row>
          <div className="ms-3">
            <Form.Group className="mb-3">
              <Button className="ms-3" variant="success" type="submit">
                Guardar datos
              </Button>
            </Form.Group>
          </div>
        </Card>
      </Form>
    </Container>
  );
};

export default CrearPet;
