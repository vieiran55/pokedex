import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import estilos from "./NavBar.module.scss";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({
  inputPokemon,
  isShown,
  setPokemon,
  setIsShown,
}: Props) {
  const [valida, setValida] = useState(false);

  const navigate = useNavigate();

  const limpaPokemon = () => {
    setPokemon("");
  };

  const recarrega1 = () => {
    setIsShown(!true);
  };

  const recarrega2 = () => {
    setIsShown(true);
  };

  const handleClick = () => {
    if (inputPokemon === "") {
      setValida(true);
      setIsShown(!true);
    } else if (inputPokemon !== "") {
      setValida(false);
      setIsShown(true);
      setTimeout(recarrega1, 100);
      setTimeout(recarrega2, 150);
      setTimeout(limpaPokemon, 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPokemon(e.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    setIsShown(false);
  }, []);

  return (
    <>
      <div className={estilos.navContainer}>
        <nav className={estilos.navbarra}>
          <Link to="/pokedex" className={estilos.navbarra__link}>
            Pokédex
          </Link>
          <a
            onClick={() =>
              window.open("https://pokemon-app-psi-ten.vercel.app/")
            }
            className={estilos.navbarra__link}
          >
            Game
          </a>
        </nav>
        <TextField
          sx={{ fontWeight: "bold" }}
          error={valida}
          className={estilos.pesquisa}
          id="standard-basic"
          label="Search..."
          type="text"
          variant="filled"
          value={inputPokemon}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                className={estilos.icon__container}
              >
                <BiSearchAlt
                  type="submit"
                  className={estilos.icon__container__icon}
                  onClick={handleClick}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </>
  );
}
