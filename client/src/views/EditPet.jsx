import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import AddressAndMap from "../components/AddressAndMap";
import PetImageInput from "../components/Cropper/PetImageInput";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCropperDisplayed, setIsCropperDisplayed] = useState(false);

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState(null);
  const [nacimiento, setNacimiento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [vacunado, setVacunado] = useState(false);
  const [desparasitado, setDesparasitado] = useState(false);
  const [esterilizado, setEsterilizado] = useState(false);
  const [microchip, setMicrochip] = useState(false);
  const [identificado, setIdentificado] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image1URL, setImage1URL] = useState("");
  const [image2URL, setImage2URL] = useState("");
  const [image3URL, setImage3URL] = useState("");
  const [image4URL, setImage4URL] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [ubicacion, setUbicacion] = useState(null);
  var formData = new FormData();

  useEffect(() => {
    const getAllInfo = async () => {
      await axios.get(`http://localhost:8000/api/pet/${id}`).then((resp) => {
        setNombre(resp.data.datosPet.petName);
        setEspecie(resp.data.datosPet.type);
        setSexo(resp.data.datosPet.gender);
        const date = new Date(resp.data.datosPet.born);
        const newDate = moment.utc(date).format("YYYY-MM-DD");
        setNacimiento(newDate);
        setDescripcion(resp.data.datosPet.description);
        setVacunado(resp.data.datosPet.vacunado);
        setDesparasitado(resp.data.datosPet.desparasitado);
        setEsterilizado(resp.data.datosPet.esterilizado);
        setMicrochip(resp.data.datosPet.microchip);
        setIdentificado(resp.data.datosPet.identificado);
        setUbicacion(resp.data.datosPet.ubicacion);
        setCoordenadas(resp.data.datosPet.coordenadas);
        setImage1URL(resp.data.datosPet.linkimagen1);
        setImage2URL(resp.data.datosPet.linkimagen2);
        setImage3URL(resp.data.datosPet.linkimagen3);
        setImage4URL(resp.data.datosPet.linkimagen4);
      });
    };
    getAllInfo();
  }, []);
  const putImage1 = (file) => {
    setImage1(file);
  };
  const putImage2 = (file) => {
    setImage2(file);
  };
  const putImage3 = (file) => {
    setImage3(file);
  };
  const putImage4 = (file) => {
    setImage4(file);
  };

  const editPet = async (e) => {
    e.preventDefault();
    const validateForm = () => {
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
        Swal.fire({
          icon: "error",
          text: "Debe agregar la foto de perfil de la mascota!"
        });
        return;
      } else if (image2 === false) {
        Swal.fire({
          icon: "error",
          text: "Debe agregar una foto más!"
        });
        return;
      } else if (image3 === false) {
        Swal.fire({
          icon: "error",
          text: "Debe agregar una foto más!"
        });
        return;
      } else if (image4 === false) {
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
    };
    await validateForm();
    const appendEverything = async () => {
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
    };
    await appendEverything();
    axios
      .put(`http://localhost:8000/api/pet/update/${id}`, formData)
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
      <Form onSubmit={editPet}>
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
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  minLength={3}
                  id="petName"
                  style={{ width: "200px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Especie:</Form.Label>
                <Form.Select
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                  required
                  id="type"
                  style={{ width: "150px" }}
                >
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
                  checked={sexo === "Macho" ? true : false}
                  onChange={(e) => {
                    setSexo(e.target.value);
                  }}
                  inline
                  label="Macho"
                  name="gender"
                  type="radio"
                  value="Macho"
                />
                <Form.Check
                  checked={sexo === "Hembra" ? true : false}
                  onChange={(e) => {
                    setSexo(e.target.value);
                  }}
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
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  type="date"
                  minLength={3}
                  id="born"
                  style={{ width: "150px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pet Description:</Form.Label>
                <Form.Control
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
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
                  checked={vacunado}
                  type="checkbox"
                  label="Vacunado"
                  id="vacunado"
                  onChange={(e) => setVacunado(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  checked={desparasitado}
                  type="checkbox"
                  label="Desparasitado"
                  id="desparasitado"
                  onChange={(e) => setDesparasitado(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  checked={esterilizado}
                  type="checkbox"
                  label="Esterilizado"
                  id="esterilizado"
                  onChange={(e) => setEsterilizado(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  checked={microchip}
                  type="checkbox"
                  label="Microchip"
                  id="microchip"
                  onChange={(e) => setMicrochip(e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  checked={identificado}
                  type="checkbox"
                  label="Identificado"
                  id="identificado"
                  onChange={(e) => setIdentificado(e.target.checked)}
                />
              </Form.Group>
              <div className="mt-3" id="SECCION DE FOTOS DE PERFIL">
                <Form.Group>
                  {/* SECCION DE FOTOS DE PERFIL */}
                  <Form.Label>Imagen 1:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen1"}
                    putImage={putImage1}
                    initImageURL={image1URL}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 2:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen2"}
                    putImage={putImage2}
                    initImageURL={image2URL}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 3:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen3"}
                    initImageURL={image3URL}
                    putImage={putImage3}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen 4:</Form.Label>
                  <PetImageInput
                    linkimagen={"linkimagen4"}
                    initImageURL={image4URL}
                    putImage={putImage4}
                    setIsCropperDisplayed={setIsCropperDisplayed}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <AddressAndMap
                  initCoords={coordenadas}
                  initUbicacion={ubicacion}
                  isCropperDisplayed={isCropperDisplayed}
                />
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

export default EditPet;
