import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import axios from "axios";

const PokemonCard = ({ generationId, searchInput }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const onSelectPokemon = (pokemonId) => {
    console.log("Selected Pokemon ID:", pokemonId); // Log the selected Pokemon ID
  };

  const filteredPokemon = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/generation/${generationId}`);
        const pokemonData = response.data.pokemon_species;
  
        // Fetch additional details for each Pokemon to get the ID
        const pokemonDetailsPromises = pokemonData.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          return {
            id: pokemonDetailsResponse.data.id,
            name: pokemon.name,
          };
        });
  
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
  
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data", error);
      }
    };
  
    fetchPokemonList();
  }, []);  

  const handleViewDetails = (pokemon) => {
    const selectedPokemonIdToUpdate = pokemon.id;
  
    if (selectedPokemonIdToUpdate !== null) {
      setSelectedPokemonId(selectedPokemonIdToUpdate); // Update the selectedPokemonId state variable
      onSelectPokemon(selectedPokemonIdToUpdate); // Call the onSelectPokemon function
  
      // Use the updated state value in the callback function
      setSelectedPokemonId((prevSelectedPokemonId) => {
        console.log("Selected Pokemon ID:", prevSelectedPokemonId);
        // Redirect to the /pokemon-info route with the selected Pokemon ID in the URL
        window.location.href = `/pokemon-info/${prevSelectedPokemonId}`;
        return prevSelectedPokemonId; // Return the updated state value
      });
    }
  };  

  return (
    <div className="p-3" style={{
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {filteredPokemon.map((pokemon, index) => (
        <Card key={index} style={{ margin: "10px", minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6">{pokemon.name}</Typography>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                margin: "0 auto"
              }}
            />
          </CardContent>
          <CardActions style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center"
          }}>
            <Button
              onClick={(e) => handleViewDetails(pokemon)}
              variant="contained"
              style={{ width: "100%", backgroundColor: "red" }}
            >
              View details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default PokemonCard;