import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pagine/Home";
import PokemonView from "./pagine/PokemonView";
import PokemonInfo from "./pagine/PokemonInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon-view/:generationId" element={<PokemonView />}></Route>
        <Route path="/pokemon-info/:selectedPokemonId" element={<PokemonInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
