import Header from "pages/Header";
import Home from "pages/Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import estilos from "./styles/Routes.module.scss";

export default function AppRouter() {
  const [inputPokemon, setPokemon] = useState("");
  const [isShown, setIsShown] = useState(false);

  return (
    <main className={estilos.routes}>
      <Router>
        <Header />
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
        </Routes>
      </Router>
    </main>
  );
}
