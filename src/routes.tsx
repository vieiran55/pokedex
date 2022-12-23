import Header from "components/Header";
import Home from "pages/Home";
import Pokedex from "pages/Pokedex";
import NotFound from "pages/NotFound";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import estilos from "./styles/Routes.module.scss";
import NavBar from "components/NavBar";

export default function AppRouter() {
  const [inputPokemon, setPokemon] = useState("");
  const [isShown, setIsShown] = useState(false);
  // const [isShownLoading, setisShownLoading] = useState(false);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  const [next, setNext] = useState("");
  const [previous, setprevious] = useState("");

  return (
    <main className={estilos.routes}>
      <Router>
        <Header />
        <NavBar
          inputPokemon={inputPokemon}
          setPokemon={setPokemon}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                inputPokemon={inputPokemon}
                setPokemon={setPokemon}
                isShown={isShown}
                setIsShown={setIsShown}
              />
            }
          />
          <Route
            path="/pokedex"
            element={
              <Pokedex
                inputPokemon={inputPokemon}
                setPokemon={setPokemon}
                url={url}
                setUrl={setUrl}
                next={next}
                setNext={setNext}
                previous={previous}
                setprevious={setprevious}
                isShown={isShown}
                setIsShown={setIsShown}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}
