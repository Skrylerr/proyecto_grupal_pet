import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

<<<<<<< HEAD
const PetCard = ({ datosPet, selectedSpecies, selectedGender }) => {
  const filteredPetList = datosPet.filter(pet => {
    if (selectedSpecies && pet.type !== selectedSpecies) {
      return false;
    }
    if (selectedGender && pet.gender !== selectedGender) {
      return false;
    }
    return true;
  });

  return (
    <React.Fragment>
      {filteredPetList.map((pet, i) =>
        <Card style={{ width: '15rem', margin:"0 7px 25px 7px"}} key={i}>
          <Card.Img variant="top" src={pet.linkimagen} style={{ height: '10rem'}} />
          <Card.Body>
            <Card.Title>{pet.petName}</Card.Title>
            <Card.Text>
              {pet.type}
            </Card.Text>
=======
const PetCard = ({ datosPet }) => {
  return (
    <React.Fragment>
      {datosPet.map((pet, i) => (
        <Card style={{ width: "15rem", margin: "0 7px 25px 7px" }} key={i}>
          <Card.Img
            variant="top"
            src={pet.linkimagen}
            style={{ height: "10rem" }}
          />
          <Card.Body>
            <Card.Title>{pet.petName}</Card.Title>
            <Card.Text>{pet.type}</Card.Text>
>>>>>>> b0cf9988a5919746b4fd90cdf61988e473d3e56a
          </Card.Body>
          <div className="d-flex justify-content-around mb-2">
            <Link to={`/pets/${pet._id}`}>
              <Button variant="primary">Ver detalle</Button>
            </Link>
            {/* <Link to={`/pets/${pet._id}/edit`}>
              <Button variant="primary">Editar info</Button>
            </Link> */}
          </div>
        </Card>
<<<<<<< HEAD
      )}
=======
      ))}
>>>>>>> b0cf9988a5919746b4fd90cdf61988e473d3e56a
    </React.Fragment>
  );
};

export default PetCard;
<<<<<<< HEAD

=======
>>>>>>> b0cf9988a5919746b4fd90cdf61988e473d3e56a
