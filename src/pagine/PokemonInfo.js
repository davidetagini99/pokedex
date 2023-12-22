import React from "react";
import { useParams } from "react-router-dom";
import PokemonData from "../componenti/PokemonData";

const PokemonInfo = () => {
  const { selectedPokemonId } = useParams();

  // Now selectedPokemonId is available for use in your component

  return (
    <div className="md:overflow-x-hidden">
      {/* Pass selectedPokemonId to PokemonData */}
      <PokemonData pokemonId={selectedPokemonId} />
    </div>
  );
};

export default PokemonInfo;
