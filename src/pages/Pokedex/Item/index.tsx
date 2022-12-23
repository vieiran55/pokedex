import axios from "axios";
import IData from "interfaces/IData";
import { useEffect, useState } from "react";
import Itens from "./Itens";
import estilos from "./Item.module.scss";

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

export default function Item(props: Props) {
  const {
    url,
    setUrl,
    next,
    setNext,
    previous,
    setprevious,
    inputPokemon,
    setPokemon,
    isShown,
    setIsShown,
  } = props;

  const [repositorio, setRepositorio] = useState<IData[]>([]);
  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);
  const [foto, setFoto] = useState("");
  const [tipo1, setTipo1] = useState("" && true);

  useEffect(() => {
    // obter Pokemon
    axios
      .get(url)
      .then((resposta) => {
        console.log(resposta);
        setRepositorio(resposta.data.results);
        setNext(resposta.data.next);
        setprevious(resposta.data.previous);
        setID(resposta.data.id);
        // setNomeDoPokemon(resposta.data.name);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setTipo1(resposta.data.types[0].type.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <div>
      <div className={estilos.itens}>
        {repositorio.map((item, index) => (
          <Itens
            inputPokemon={inputPokemon}
            setPokemon={setPokemon}
            isShown={isShown}
            setIsShown={setIsShown}
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
