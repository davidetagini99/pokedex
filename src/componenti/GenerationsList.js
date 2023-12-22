import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenerationsList() {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/generation/");
        const data = await response.json();
        setGenerations(data.results);
      } catch (error) {
        console.error("Error fetching generations:", error);
      }
    };

    fetchGenerations();
  }, []);

  return (
    <div className="md:flex md:flex-col md:justify-center md:align-middle md:p-5 h-screen flex flex-col justify-start align-middle">
      <ul className="text-center p-5">
        {generations.map((generation) => (
          <li
            key={generation.name}
            className="md:flex md:flex-col md:justify-center md:align-middle md:pb-4 border-b-2 border-red-500 p-4"
          >
            <Link to={`/pokemon-view/${generation.name}`} className="p-3 w-full text-start">
              {generation.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
