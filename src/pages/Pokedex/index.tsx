import axios from "axios";
import IData from "interfaces/IData";
import Pokemon from "pages/Pokemon";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import Itens from "./Item/Itens";
import estilos from "./Pokedex.module.scss";
import {GrNext} from "react-icons/gr";
import {GrPrevious} from "react-icons/gr";

interface Props {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  next: string;
  setNext: React.Dispatch<React.SetStateAction<string>>;
  previous: string;
  setprevious: React.Dispatch<React.SetStateAction<string>>;
  inputPokemon: string;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Pokedex({
  inputPokemon,
  setPokemon,
  url,
  setUrl,
  next,
  setNext,
  previous,
  setprevious,
  isShown,
  setIsShown,
}: Props) {
  const [repositorio, setRepositorio] = useState("");

  useEffect(() => {
    setIsShown(false);
    setUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
    // obter Pokemon
    axios
      .get(url)
      .then((resposta) => {
        setRepositorio(resposta.data.results);
        setNext(resposta.data.next);
        setprevious(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const navigate = useNavigate();

  const proxima = () => {
    setValidaBotao(false);
    setIsShown(false);
    setTimeout(recarrega1, 100);
    setTimeout(recarrega2, 150);
    setUrl(next);
  };

  const anterior = () => {
    setIsShown(false);
    setTimeout(recarrega1, 100);
    setTimeout(recarrega2, 150);
    setUrl(previous);
  };

  const recarrega1 = () => {
    setisShownLoading(!true);
  };

  const recarrega2 = () => {
    setisShownLoading(true);
  };

  const [isShownLoading, setisShownLoading] = useState(true);
  const [validaBotao, setValidaBotao] = useState(true);

  return (
    <>
      <div className={estilos.botoes}>       
        <button className={estilos.botoes__tipo} onClick={proxima}>Next Page</button>
        <div className={estilos.botoes__titulo}>
          <h1 className={estilos.botoes__titulo__texto}>
          Pokédex
          </h1>
        </div>
        <button className={estilos.botoes__tipo} onClick={anterior} disabled={validaBotao}>
          Previous Page
        </button>
      </div>
      <div className={estilos.itens}>
        {isShown && (
          <Pokemon
            inputPokemon={inputPokemon}
            setPokemon={setPokemon}
            isShown={isShown}
            setIsShown={setIsShown}
          />
        )}
        <>
          {isShownLoading && (
            <Item
              url={url}
              setUrl={setUrl}
              next={next}
              setNext={setNext}
              previous={previous}
              setprevious={setprevious}
              inputPokemon={inputPokemon}
              setPokemon={setPokemon}
              isShown={isShown}
              setIsShown={setIsShown}
            />
          )}
        </>
      </div>
      <div className={estilos.botoes}>       
        <button className={estilos.botoes__tipo} onClick={proxima}>Next Page</button>
        <button className={estilos.botoes__tipo} onClick={anterior} disabled={validaBotao}>
          Previous Page
        </button>
      </div>
    </>
  );
}
