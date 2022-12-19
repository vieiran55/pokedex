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
      setTimeout(recarrega1, 500);
      setTimeout(recarrega2, 600);
      setTimeout(limpaPokemon, 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPokemon(e.target.value);
  };

  return (
    <>
      <div className={estilos.home}>
        <TextField
          sx={{ fontWeight: "bold" }}
          error={valida}
          className={estilos.pesquisa}
          id="standard-basic"
          label="Qual o seu pokemon?"
          type="text"
          variant="outlined"
          value={inputPokemon}
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
        {isShown && (
          <Pokemon
            inputPokemon={inputPokemon}
            setPokemon={setPokemon}
            isShown={isShown}
            setIsShown={setIsShown}
          />
        )}
      </div>
      <div className={estilos.cads}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
