import axios from "axios";
import Pokemon from "components/Pokemon";
import * as React from "react";
import { useEffect, useState } from "react";
import Item from "./Item";
import estilos from "./Pokedex.module.scss";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowUpCircleFill } from "react-icons/bs";

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
  const [isShownLoading, setisShownLoading] = useState(true);
  const [validaBotao, setValidaBotao] = useState(true);
  
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

  const topo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  return (
    <>
      {/* <span className="animate-waving-hand">👋🏻</span> */}
      <div className={estilos.botoes}>
        <button className={estilos.botoes__tipo} onClick={proxima}>
          <BsArrowRightCircleFill className={estilos.seta} />
        </button>
        <div className={estilos.botoes__titulo}>
        </div>
        <button
          className={estilos.botoes__tipo}
          onClick={anterior}
          disabled={validaBotao}
        >
          <BsArrowLeftCircleFill className={estilos.seta} />
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
        <button className={estilos.botoes__tipo} onClick={proxima}>
          <BsArrowRightCircleFill className={estilos.seta} />
        </button>
        <button className={estilos.botoes__tipo__up} onClick={topo}>
          <BsArrowUpCircleFill className={estilos.seta} />
        </button>
        <button
          className={estilos.botoes__tipo}
          onClick={anterior}
          disabled={validaBotao}
        >
          <BsArrowLeftCircleFill className={estilos.seta} />
        </button>
      </div>
    </>
  );
}
