import axios from "axios";
import IData from "interfaces/IData";
import * as React from "react";
import { useEffect, useState } from "react";
import estilos from "./Card.module.scss";

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Card(props: Props) {
  const { inputPokemon, isShown, setPokemon, setIsShown } = props;

  const [repositorio, setRepositorio] = useState<IData[]>([]);
  const [nomeDoPokemon, setNomeDoPokemon] = useState("");
  const nomePokemonReal = nomeDoPokemon.toUpperCase();
  const inputPokemonReal = nomePokemonReal.toLowerCase();
  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);
  const [foto, setFoto] = useState("");
  const [tipo1, setTipo1] = useState("" && true);
  const [sorteio, setSorteio] = useState<number[]>([]);

  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${numero1}`)
      .then((resposta) => {
        setRepositorio(resposta.data);
        setID(resposta.data.id);
        setNomeDoPokemon(resposta.data.name);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setTipo1(resposta.data.types[0].type.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const numero1 = Math.floor(Math.random() * 891);

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
    if (!isShown) {
      setIsShown(true);
      setPokemon(inputPokemonReal);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setTimeout(limpaPokemon, 2000);

    } else if (isShown) {

      setTimeout(recarrega1, 100);
      setTimeout(recarrega2, 150);
      setPokemon(inputPokemonReal);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setTimeout(limpaPokemon, 2000);
    }
  };

  return (
    <div
      className={estilos[`${tipo1}`]}
      onClick={handleClick}
    >
      <div className={estilos[`${tipo1}__card`]}>
        <div>
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
    </div>
  );
}
