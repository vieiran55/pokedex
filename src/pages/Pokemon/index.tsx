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

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Pokemon(props: Props) {
  const { inputPokemon, isShown, setPokemon, setIsShown } = props;

  const [repositorio, setRepositorio] = useState<IData[]>([]);
  const valoresrepositorio = Object.values(repositorio);
  const valoresrepositorioString = valoresrepositorio.map(function (
    item,
    indice
  ) {
    return item.toString();
  });

  const alturaPokemon = parseFloat(valoresrepositorioString[4]);
  const pokemonId = parseFloat(valoresrepositorioString[6]);
  const alturaReal = converterAltura(alturaPokemon);
  const nomePokemon = valoresrepositorioString[10];
  const pesoPokemon = parseFloat(valoresrepositorioString[17]);
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

  const [tipo, setTipo] = useState<IData[]>([]);
  const valoresTipo = Object.values(tipo);
  const valoresTipoString = valoresTipo.map(function (item, indice) {
    return item.toString();
  });
  const tipoPokemon = valoresTipoString[0];

  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputPokemon}`)
      .then((resposta) => {
        setRepositorio(resposta.data);
        setHP(resposta.data.stats[0].base_stat);
        setAttack(resposta.data.stats[1].base_stat);
        setDefense(resposta.data.stats[2].base_stat);
        setEspecialAttack(resposta.data.stats[3].base_stat);
        setEspecialDefense(resposta.data.stats[4].base_stat);
        setSpeed(resposta.data.stats[5].base_stat);
        setFoto(resposta.data.sprites.other.dream_world.front_default);
        setTipo(resposta.data.types[0].type);
        setHabilidadesLength(resposta.data.abilities);
        setHabilidade1(resposta.data.abilities[0].ability.name);
        setHabilidade2(resposta.data.abilities[1].ability.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  // function carregaHabilidades() {
  //   if (habilidadesLength > 1) {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon/metapod")
  //       .then((resposta) => {
  //         setHabilidade1(resposta.data.abilities[0].ability.name);
  //         console.log(habilidade1);
  //         setHabilidade2(resposta.data.abilities[1].ability.name);
  //       })
  //       .catch((erro) => {
  //         console.log(erro);
  //       });
  //   } else {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon/mewtwo")
  //       .then((resposta) => {
  //         setHabilidade1(resposta.data.abilities[0].ability.name);
  //       })
  //       .catch((erro) => {
  //         console.log(erro);
  //       });
  //   }
  // }

  // const [progress, setProgress] = React.useState(0);

  const [progress, setProgress] = React.useState(0);

  function CirculoStatusHP(props: CircularProgressProps & { value: number }) {
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
    <div className={estilos[`${tipoPokemon}`]}>
      <div className={estilos.titulo}>
        <h1>{nomePokemon}</h1>
        <p>#00{pokemonId}</p>
      </div>
      <img className={estilos.imagem} src={`${foto}`} />
      <div className={estilos.container}>
        <div className={estilos[`tipo__${tipoPokemon}`]}>{tipoPokemon}</div>
        <div className={estilos.sobre}>
          <h2>About</h2>
          <div className={estilos.peso_altura}>
            <div className={estilos.peso}>
              <a>weight</a>
              <a>{presoReal} Kg</a>
            </div>
            <div className={estilos.altura}>
              <a>height</a>
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
                <CirculoStatusHP value={hpReal / 3} />
              </div>
            </div>
            <div>
              <div>ATK</div>
              <div>
                <CirculoStatusATK value={attackReal / 3} />
              </div>
            </div>
            <div>
              <div>DEF</div>
              <div>
                <CirculoStatusDEF value={defenseReal / 3} />
              </div>
            </div>
            <div>
              <div>SATK</div>
              <div>
                <CirculoStatusSATK value={eAttackReal / 3} />
              </div>
            </div>
            <div>
              <div>SDEF</div>
              <div>
                <CirculoStatusSDEF value={eDefenseReal / 3} />
              </div>
            </div>
            <div>
              <div>SPD</div>
              <div>
                <CirculoStatusSPD value={speedReal / 3} />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
