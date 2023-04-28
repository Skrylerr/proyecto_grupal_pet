import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPet = () => {


  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const {id} = useParams();
  const [mensaje, setMensaje] = useState();
  const navigate = useNavigate();
  const [setErrors] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:8000/api/pet/${id}`)
    .then(resp => {
      setPetName(resp.data.datosPet.petName);
      setType(resp.data.datosPet.type);
      setDescription(resp.data.datosPet.description);
      setSkill1(resp.data.datosPet.skill1)
      setSkill2(resp.data.datosPet.skill2)
      setSkill3(resp.data.datosPet.skill3)
    })
    .catch(err => console.log(err));
  }, [id])

  const actualizar = (e) => {
    e.preventDefault();

    if(e.target.petName.value === ""){
      setMensaje("Debe indicar el nombre de la mascota");
      return;
    } else if(e.target.type.value === ""){
      setMensaje("Debe indicar el tipo de mascota");
      return;
    } else if(e.target.description.value === ""){
      setMensaje("Debe agregar una descripcion de la mascota");
      return;
    }

    var datosPet = {
      petName,
      type,
      description,
      skill1,
      skill2,
      skill3,
    };
    axios.put(`http://localhost:8000/api/pet/update/${id}`, datosPet)
        .then(resp => {
            console.log(resp);
            if (resp.data.error) {
              setErrors(resp.data.error.errors);
            } else {
              console.log(datosPet)
              alert("Mascota actualizada!");
              console.log(resp.data.mensaje)
              navigate("/");
            }
        })
        .catch(err => console.log(err));
}

  return (
    <Container>
        <Row>
          <h2>Edit {petName} </h2>
        </Row>
        <Row>
          <div className="mb-3">
          {mensaje}
          </div>
        </Row>
        <Form onSubmit={actualizar}>
          <Row className="px-3" style={{border:"solid"}}>
              <Col className="m-3">
                <Form.Group className="mb-3" >
                  <Form.Label>Pet Name:</Form.Label>
                  <Form.Control type="text"
                    minLength={3}
                    id="petName"
                    onChange={e => setPetName(e.target.value)}
                    value={petName}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pet Type:</Form.Label>
                  <Form.Control type="text"
                    minLength={3}
                    id="type"
                    onChange={e => setType(e.target.value)}
                    value={type}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pet Description:</Form.Label>
                  <Form.Control type="text"
                    minLength={3}
                    id="description"
                    onChange={e => setDescription(e.target.value)}
                    value={description}/>
                </Form.Group>
                <Form.Group className="mt-5">
                  <Button  className="mt-4" variant="primary" type="submit">
                    Edit Pet
                  </Button>
                </Form.Group>
              </Col>
              <Col className="m-3">
                <div>
                  <p>Skills (optional): </p>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Skill 1:</Form.Label>
                  <Form.Control type="text"
                    id="skill1"
                    onChange={e => setSkill1(e.target.value)}
                    value={skill1 ? `${skill1}` : "Nothing" }/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Skill 2:</Form.Label>
                  <Form.Control type="text"
                    id="skill2"
                    onChange={e => setSkill2(e.target.value)}
                    value={skill2 ? `${skill2}` : "Nothing"}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Skill 3:</Form.Label>
                  <Form.Control type="text"
                    id="skill3"
                    onChange={e => setSkill3(e.target.value)}
                    value={skill3 ? `${skill3}` : "Nothing"}/>
                </Form.Group>
              </Col>
          </Row>
        </Form>
    </Container>
  )
}

export default EditPet;