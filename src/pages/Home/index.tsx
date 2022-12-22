import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import estilos from "./Home.module.scss";
import Pokemon from "pages/Pokemon";
import axios from "axios";
import IData from "interfaces/IData";
import Card from "pages/Card";
import Loading from "pages/Pokedex";
import { useNavigate } from "react-router-dom";

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Home({
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
      <div className={estilos.home}>
        {isShown && (
          <Pokemon
            inputPokemon={inputPokemon}
            setPokemon={setPokemon}
            isShown={isShown}
            setIsShown={setIsShown}
          />
        )}
      </div>
      <div></div>
      <div className={estilos.cads}>
        <Card
          inputPokemon={inputPokemon}
          setPokemon={setPokemon}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <Card
          inputPokemon={inputPokemon}
          setPokemon={setPokemon}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <Card
          inputPokemon={inputPokemon}
          setPokemon={setPokemon}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <Card
          inputPokemon={inputPokemon}
          setPokemon={setPokemon}
          isShown={isShown}
          setIsShown={setIsShown}
        />
      </div>
    </>
  );
}
