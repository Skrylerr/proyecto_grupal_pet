import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PetCard = ({ datosPet, selectedSpecies, selectedGender, userId }) => {
  const filteredPetList = datosPet.filter((pet) => {
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
      {filteredPetList.map((pet, i) => {
        const canEdit = pet.userId === userId; // verifica si el userId de la mascota coincide con el userId del usuario logueado

        return (
          <Card style={{ width: "15rem", margin: "0 7px 25px 7px" }} key={i}>
            <Card.Img
              variant="top"
              src={`http://localhost:8000/images/${pet.linkimagen1}`}
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
              {canEdit && (
                <Link to={`/pets/${pet._id}/edit`}>
                  <Button variant="primary">Editar</Button>
                </Link>
              )}
            </div>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default PetCard;
