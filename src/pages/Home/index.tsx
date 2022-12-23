import * as React from "react";
import { useEffect, useState } from "react";
import estilos from "./Home.module.scss";
import Pokemon from "components/Pokemon";
import Card from "components/Card";
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
