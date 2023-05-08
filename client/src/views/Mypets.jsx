import React, { useState, useEffect } from "react";
import axios from "axios";

const MyPets = ({ userId }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/api/pets/${userId}`);
            setPets(response.data);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [userId]);

    return (
        <div>
        <h1>My Pets</h1>
        {pets.length ? (
            <ul>
            {pets.map((pet) => (
                <li key={pet._id}>
                {pet.petName && <h2>{pet.petName}</h2>}
                <p>Especie: {pet.type}</p>
                <p>Genero: {pet.gender}</p>
                <p>Fecha de Nacimiento: {pet.born}</p>
                <p>Descripcion: {pet.description}</p>
                <p>Ubicacion: {pet.ubicacion}</p>
                <img src={pet.linkimagen} alt="pet" />
                </li>
            ))}
            </ul>
        ) : (
            <p>No pets found.</p>
        )}
        </div>
    );
};

export default MyPets;
