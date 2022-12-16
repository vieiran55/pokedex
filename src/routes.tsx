import Home from "pages/Home";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  const [inputPokemon, setPokemon] = useState("");
  const [isShown, setIsShown] = useState(false);

  return (
    <main>
      <Router>
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
