import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      ))}
    </React.Fragment>
  );
};

export default PetCard;
