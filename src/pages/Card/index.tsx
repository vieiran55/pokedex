import axios from "axios";
import IData from "interfaces/IData";
import * as React from "react";
import { useEffect, useState } from "react";
import estilos from "./Card.module.scss";

export default function Card() {
  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${numero1}`)
      .then((resposta) => {
        setRepositorio(resposta.data);
        console.log(resposta);
        setID(resposta.data.id);
        setNomeDoPokemon(resposta.data.name);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setTipo1(resposta.data.types[0].type.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const [repositorio, setRepositorio] = useState<IData[]>([]);
  const [nomeDoPokemon, setNomeDoPokemon] = useState("");
  const nomePokemonReal = nomeDoPokemon.toUpperCase();
  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);
  const [foto, setFoto] = useState("");
  const [tipo1, setTipo1] = useState("" && true);
  const [sorteio, setSorteio] = useState<number[]>([]);

  // useEffect(() => {
  //   const maxNumbers = 1000;
  //   const list = [];
  //   for (let i = 0; i < maxNumbers; i++) {
  //     list[i] = i + 1;
  //   }

  //   let randomNumber;
  //   let tmp;
  //   for (let i = list.length; i; ) {
  //     randomNumber = (Math.random() * i--) | 0;
  //     tmp = list[randomNumber];
  //     // troca o número aleatório pelo atual
  //     list[randomNumber] = list[i];
  //     // troca o atual pelo aleatório
  //     list[i] = tmp;
  //     console.log(sorteio[1]);
  //   }
  //   console.log(list[1]);
  // }, []);

  const numero1 = Math.floor(Math.random() * 891);

  return (
    <div className={estilos[`${tipo1}`]}>
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
