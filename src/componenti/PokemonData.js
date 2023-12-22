import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const PokemonData = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = response.data;
        setPokemonData(pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemonData) {
    return null; // or a loading indicator
  }

  const name = pokemonData.name;

  const movesList = pokemonData.moves
    ? (
      <ul className="flex flex-col justify-center align-middle text-start p-5">
        {pokemonData.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    )
    : null;

  // Extracting image
  const imageUrl = pokemonData.sprites ? pokemonData.sprites.front_default : "";

  // Extracting types
  const typesList = pokemonData.types ? pokemonData.types.map(type => type.type.name).join(", ") : "";

  // Extracting types as an unordered list
  /*const typesList = pokemonData.types
    ? (
      <ul>
        {pokemonData.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
    )
    : null;*/

  // Extracting form as an unordered list
  const formList = pokemonData.forms
    ? (
      <ul className="md:w-full md:flex md:flex-row md:justify-start md:align-middle md:p-3">
        {pokemonData.forms.map((form, index) => (
          <li key={index}><p>{form.name}</p></li>
        ))}
      </ul>
    )
    : null;

  return (
    <div className="md:h-screen md:flex md:flex-col md:justify-start md:align-middle md:p-5 flex flex-col justify-center align-middle p-2">
      <div className="md:flex md:flex-row md:justify-center md:align-middle md:p-5 flex flex-row justify-center align-middle p-5">
        <Typography variant="h4" className="text-start">{name}</Typography>
        <div className="md:flex md:flex-row md:justify-start md:align-middle md:p-3">
          <p className="">Numero generazione</p>
        </div>
      </div>
      <div className="md:flex md:flex-row md:justify-start md:align-middle md:p-5 flex flex-row justify-center align-middle p-2">
        <Typography variant="subtitle1">Info pokemon</Typography>
      </div>
      {/* Add the rest of your content here */}
      <div className="md:flex md:flex-row md:justify-center md:align-middle flex flex-row justify-between align-middle">
        <div className="md:flex md:flex-row md:justify-between md:w-4/6 md:align-middle flex flex-row justify-between align-middle w-full">
          <img src={imageUrl} alt={name} className="md:w-48 object-cover" />
          <div className="md:flex md:flex-row md:justify-end md:align-middle md:w-full md:text-end md:p-3">
            <div className="md:flex md:flex-row md:justify-center md:align-middle md:text-center md:p-5 h-full flex flex-col justify-center align-middle text-center p-2">
              <Typography variant="subtitle1">Types:</Typography>
              <span className="md:pl-3">{typesList}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-col md:p-5 flex flex-col p-2">
        <Typography variant="subtitle1">Moves:</Typography>
        <div className="md:flex md:flex-col md:justify-start md:align-middle md:p-5 flex flex-col justify-center align-middle">
          {movesList}
        </div>
        <div className="md:w-full md:flex md:flex-row md:justify-start md:align-middle flex flex-col justify-start align-middle p-2">
          <Typography variant="subtitle1">Forms:</Typography>
          {formList}
        </div>
      </div>
    </div>
  );
}

export default PokemonData;