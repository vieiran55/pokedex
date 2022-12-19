import axios from "axios";
import IData from "interfaces/IData";
import IHabilidadesNomes from "interfaces/IHabilidadesNomes";
import estilos from "./Pokemon.module.scss";
import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { color } from "@mui/system";

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Pokemon(props: Props) {
  const { inputPokemon, isShown, setPokemon, setIsShown } = props;
  const inputPokemonReal = inputPokemon.toLowerCase();

  const [repositorio, setRepositorio] = useState<IData[]>([]);
  // const valoresrepositorio = Object.values(repositorio);
  // const valoresrepositorioString = valoresrepositorio.map(function (
  //   item,
  //   indice
  // ) {
  //   return item.toString();
  // });

  const [altura, setAltura] = useState("");
  const alturaPokemon = parseFloat(altura);
  const alturaReal = converterAltura(alturaPokemon);

  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);

  const pokemonIdDivisao = pokemonId/100;


  // const idSemPonto = id.replace(/,/g, "").replace(/\./g, "");

  
  const [nomeDoPokemon, setNomeDoPokemon] = useState("");
  const nomeDoPokemonReal = nomeDoPokemon.toUpperCase();

  const [peso, setPeso] = useState("");
  const pesoPokemon = parseFloat(peso);
  const presoReal = converterPeso(pesoPokemon);

  function converterPeso(NrHg: number) {
    return NrHg / 10;
  }

  function converterAltura(NrDm: number) {
    return NrDm / 10;
  }

  const [habilidadesLength, setHabilidadesLength] = useState<IData[]>([]);

  const [habilidade1, setHabilidade1] = useState("");

  const [habilidade2, setHabilidade2] = useState("");

  const [hp, setHP] = useState("");
  const hpReal = parseFloat(hp);
  const [attack, setAttack] = useState("");
  const attackReal = parseFloat(attack);
  const [defense, setDefense] = useState("");
  const defenseReal = parseFloat(defense);
  const [eAttack, setEspecialAttack] = useState("");
  const eAttackReal = parseFloat(eAttack);
  const [eDefense, setEspecialDefense] = useState("");
  const eDefenseReal = parseFloat(eDefense);
  const [speed, setSpeed] = useState("");
  const speedReal = parseFloat(speed);

  const [foto, setFoto] = useState<IData[]>([]);

  const [tipo1, setTipo1] = useState("");
  const [tipo2, setTipo2] = useState("");

  const [errou, setErrou] = useState("");


  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputPokemonReal}`)
      .then((resposta) => {
        setRepositorio(resposta.data);
        console.log(resposta);
        setAltura(resposta.data.height);
        setID(resposta.data.id);
        setNomeDoPokemon(resposta.data.name);
        setPeso(resposta.data.weight);
        setHP(resposta.data.stats[0].base_stat);
        setAttack(resposta.data.stats[1].base_stat);
        setDefense(resposta.data.stats[2].base_stat);
        setEspecialAttack(resposta.data.stats[3].base_stat);
        setEspecialDefense(resposta.data.stats[4].base_stat);
        setSpeed(resposta.data.stats[5].base_stat);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setTipo1(resposta.data.types[0].type.name);
        setHabilidadesLength(resposta.data.abilities);
        setHabilidade1(resposta.data.abilities[0].ability.name);
        setHabilidade2(resposta.data.abilities[1].ability.name);
      })
      .catch((erro) => {
        setErrou("Algo deu errado, certifique-se que digitou o nome correto"); 
        console.log(erro);
      });
  }, []);

  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputPokemonReal}`)
      .then((resposta) => {
        setTipo2(resposta.data.types[1].type.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);



  function CirculoStatusHP(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex", }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(hpReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  function CirculoStatusATK(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(attackReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  function CirculoStatusDEF(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(defenseReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  function CirculoStatusSATK(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(eAttackReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  function CirculoStatusSDEF(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(eDefenseReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  function CirculoStatusSPD(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(speedReal)}`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className={estilos[`${tipo1}`]}>
      <div className={estilos.titulo}>
        <h1>{nomeDoPokemonReal}</h1>
        <p>#{pokemonId}</p>
      </div>
      <div>{errou}</div>
      <img className={estilos.imagem} src={`${foto}`} />
      <div className={estilos.container}>
        <div className={estilos[`tipo__${tipo1}`]}>{tipo1}</div>
        <div className={estilos[`tipo__${tipo2}`]}>{tipo2}</div>
        <div className={estilos.sobre}>
          <h2>About</h2>
          <div className={estilos.peso_altura}>
            <div className={estilos.peso}>
              <a>Weight</a>
              <a>{presoReal} Kg</a>
            </div>
            <div className={estilos.altura}>
              <a>Height</a>
              <a>{alturaReal} m</a>
            </div>
            <div className={estilos.habilidades}>
              <a>Habilidades</a>
              <a>{habilidade1}</a>
              <a>{habilidade2}</a>
            </div>
          </div>
        </div>
        <div className={estilos.status}>
          <h2>Base Stats</h2>
          <Box className={estilos.status__dados}>
            <div>
              <div>HP</div>
              <div>
                <CirculoStatusHP className={estilos[`${tipo1}__status`]} value={hpReal / 2} />
              </div>
            </div>
            <div>
              <div>ATK</div>
              <div>
                <CirculoStatusATK className={estilos[`${tipo1}__status`]} value={attackReal / 2} />
              </div>
            </div>
            <div>
              <div>DEF</div>
              <div>
                <CirculoStatusDEF className={estilos[`${tipo1}__status`]} value={defenseReal / 2} />
              </div>
            </div>
            <div>
              <div>SATK</div>
              <div>
                <CirculoStatusSATK className={estilos[`${tipo1}__status`]} value={eAttackReal / 2} />
              </div>
            </div>
            <div>
              <div>SDEF</div>
              <div>
                <CirculoStatusSDEF className={estilos[`${tipo1}__status`]} value={eDefenseReal / 2} />
              </div>
            </div>
            <div>
              <div>SPD</div>
              <div>
                <CirculoStatusSPD className={estilos[`${tipo1}__status`]} value={speedReal / 2} />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
