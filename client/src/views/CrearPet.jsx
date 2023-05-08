import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressAndMap from "../components/AddressAndMap";


const CrearPet = () => {
  const navigate = useNavigate();
  const [vacunado, setVacunado] = useState(false);
  const [desparasitado, setDesparasitadoo] = useState(false);
  const [esterilizado, setEsterilizado] = useState(false);
  const [microchip, setMicrochip] = useState(false);
  const [identificado, setIdentificado] = useState(false);

  const crearPet = async (e) => {
    e.preventDefault();
    const address = e.target.ubicacion.value;
    const results = await getGeocode({ address });
    const coords = await getLatLng(results[0]);
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
    }
    // else if (e.target.linkimagen.value === "") {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Debe agregar una foto de la mascota!"
    //   });
    //   return;
    // }
    var datosPet = {
      petName: e.target.petName.value,
      type: e.target.type.value,
      gender: e.target.gender.value,
      born: e.target.born.value,
      description: e.target.description.value,
      /* vacunado: e.target.description.checked, */
      vacunado: vacunado,
      desparasitado: desparasitado,
      esterilizado: esterilizado,
      microchip: microchip,
      identificado: identificado,
      linkimagen: e.target.linkimagen.value,
      linkimagen2: e.target.linkimagen2.value,
      linkimagen3: e.target.linkimagen3.value,
      linkimagen4: e.target.linkimagen4.value,
      ubicacion: e.target.ubicacion.value,
      coordenadas: coords
    };
    const formData = new FormData();
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
    formData.append("linkimagen", e.target.linkimagen.files[0]);
    formData.append("ubicacion", e.target.ubicacion.value);
    formData.append(
      "coordenadas",
      `{ "lat": ${coords.lat}, "lng": ${coords.lng} }`
    );
    const token = document.cookie.split("=")[1]; // JWT token from cookie
    formData.append("token",token);
    
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
              <div className="mt-5">
                <Form.Group>
                  {/* SECCION DE FOTOS DE PERFIL */}
                  <Form.Label>Foto de Perfil:</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Colocar url de la imagen"
                    id="linkimagen"
                    style={{ width: "300px" }}
                    multiple={false}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 2:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Colocar url de la imagen"
                    id="linkimagen2"
                    style={{ width: "300px" }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 3:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Colocar url de la imagen"
                    id="linkimagen3"
                    style={{ width: "300px" }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 4:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Colocar url de la imagen"
                    id="linkimagen4"
                    style={{ width: "300px" }}
                  />
                </Form.Group>
              </div>
              <AddressAndMap />
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