import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import estilos from "./Itens.module.scss";

interface Props {
  name: string;
  url: string;
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Itens(props: Props) {
  const [nomeDoPokemon, setNomeDoPokemon] = useState("");
  const nomePokemonReal = nomeDoPokemon.toUpperCase();
  const inputPokemonReal = nomePokemonReal.toLowerCase();
  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);
  const [foto, setFoto] = useState("");
  const [tipo1, setTipo1] = useState("" && true);
  const [sorteio, setSorteio] = useState<number[]>([]);

  const { name, url, inputPokemon, isShown, setPokemon, setIsShown } = props;

  useEffect(() => {
    // obter Pokemon
    axios
      .get(url)
      .then((resposta) => {
        setID(resposta.data.id);
        setNomeDoPokemon(resposta.data.name);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setTipo1(resposta.data.types[0].type.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const limpaPokemon = () => {
    setPokemon("");
  };

  const recarrega1 = () => {
    setIsShown(!true);
  };
  const recarrega2 = () => {
    setIsShown(true);
  };
  const topo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (!isShown) {
      setIsShown(true);
      setPokemon(inputPokemonReal);
      setTimeout(topo, 300);
      setTimeout(limpaPokemon, 2000);
    } else if (isShown) {
      setTimeout(recarrega1, 100);
      setTimeout(recarrega2, 150);
      setPokemon(inputPokemonReal);
      setTimeout(topo, 300);
      setTimeout(limpaPokemon, 2000);
    }
  };

  return (
    <>
      <div className={estilos[`${tipo1}`]} onClick={handleClick}>
        <div className={estilos[`${tipo1}__card`]}>
          <div className={estilos.titulo}>
            <p className={estilos[`${tipo1}__id`]}>#{pokemonId}</p>
          </div>
          <img className={estilos[`${tipo1}__imagem`]} src={`${foto}`} />
 
          <div className={estilos[`${tipo1}__cabecalho`]}>
            <h1 className={estilos[`${tipo1}__cabecalho__titulo`]}>
              {nomePokemonReal}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
