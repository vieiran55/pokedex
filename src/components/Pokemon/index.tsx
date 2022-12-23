import axios from "axios";
import estilos from "./Pokemon.module.scss";
import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { IoScaleOutline } from "react-icons/io5";
import { GiThermometerScale } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

interface Props {
  inputPokemon: string;
  isShown: boolean;
  setPokemon: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Pokemon(props: Props) {
  const {
    inputPokemon,
    isShown,
    setPokemon,
    setIsShown,
  } = props;
  const inputPokemonReal = inputPokemon.toLowerCase();

  const navigate = useNavigate();

  const [altura, setAltura] = useState("");
  const alturaPokemon = parseFloat(altura);
  const alturaReal = converterAltura(alturaPokemon);

  const [id, setID] = useState("");
  const pokemonId = parseFloat(id);

  const [nomeDoPokemon, setNomeDoPokemon] = useState("");
  const nomeDoPokemonReal = nomeDoPokemon.toUpperCase();
  const [peso, setPeso] = useState("");
  const pesoPokemon = parseFloat(peso);
  const presoReal = converterPeso(pesoPokemon);
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
  const [foto, setFoto] = useState("");
  const [tipo1, setTipo1] = useState("" && true);
  const [tipo2, setTipo2] = useState("" && false);
  const [errou, setErrou] = useState("");
  
  function converterPeso(NrHg: number) {
    return NrHg / 10;
  }
  function converterAltura(NrDm: number) {
    return NrDm / 10;
  }
  

  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputPokemonReal}`)
      .then((resposta) => {
        setTipo1(resposta.data.types[0].type.name);
        setNomeDoPokemon(resposta.data.name);
        setID(resposta.data.id);
        setFoto(resposta.data.sprites.other["official-artwork"].front_default);
        setPeso(resposta.data.weight);
        setAltura(resposta.data.height);
        setHP(resposta.data.stats[0].base_stat);
        setAttack(resposta.data.stats[1].base_stat);
        setDefense(resposta.data.stats[2].base_stat);
        setEspecialAttack(resposta.data.stats[3].base_stat);
        setEspecialDefense(resposta.data.stats[4].base_stat);
        setSpeed(resposta.data.stats[5].base_stat);
        setHabilidade1(resposta.data.abilities[0].ability.name);
      })
      .catch((erro) => { 
        setTipo1("unknown");
        setNomeDoPokemon("Unknown");
        setID("0");
        setPeso("0");
        setAltura("0");
        setHabilidade1("Missing");
        setHP("0");
        setAttack("0");
        setDefense("0");
        setEspecialAttack("0");
        setEspecialDefense("0");
        setSpeed("0");
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

  useEffect(() => {
    // obter Pokemon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputPokemonReal}`)
      .then((resposta) => {
        setHabilidade2(resposta.data.abilities[1].ability.name);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function CirculoStatusHP(props: CircularProgressProps & { value: number }) {
    return (
      <Box
        className={estilos.ghostgraficos}
        sx={{ position: "relative", display: "inline-flex" }}
      >
        <CircularProgress
          className={estilos.ghostgraficos}
          variant="determinate"
          {...props}
        />
        <Box
          className={estilos.ghostgraficos}
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <Typography
            className={estilos.ghostgraficos}
            variant="caption"
            component="div"
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
            color: "black",
          }}
        >
          <Typography variant="caption" component="div">{`${Math.round(
            attackReal
          )}`}</Typography>
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
            color: "black",
          }}
        >
          <Typography variant="caption" component="div">{`${Math.round(
            defenseReal
          )}`}</Typography>
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
            color: "black",
          }}
        >
          <Typography variant="caption" component="div">{`${Math.round(
            eAttackReal
          )}`}</Typography>
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
            color: "black",
          }}
        >
          <Typography variant="caption" component="div">{`${Math.round(
            eDefenseReal
          )}`}</Typography>
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
            color: "black",
          }}
        >
          <Typography variant="caption" component="div">{`${Math.round(
            speedReal
          )}`}</Typography>
        </Box>
      </Box>
    );
  }


  return (
    <>
      <div className={estilos[`${tipo1}`]}>
        <div className={estilos.titulo}>
          <h1>{nomeDoPokemonReal}</h1>
          <p className={estilos.id}>#{pokemonId}</p>
        </div>
        <img className={estilos.imagem} src={`${foto}`} />
        <div className={estilos.container}>
          <div className={estilos.tipos}>
            <div className={estilos[`tipo__${tipo1}`]}>{tipo1}</div>
            <div className={estilos[`tipo__${tipo2}`]}>{tipo2}</div>
          </div>
          <div className={estilos[`${tipo1}__sobre`]}>
            <h2 className={estilos[`${tipo1}__sobre__titulo`]}>About</h2>
            <div className={estilos.peso_altura}>
              <div className={estilos.peso}>
                <a className={estilos.peso_altura__titulo}>Weight</a>
                <div className={estilos.pesoAltura__container}>
                  <IoScaleOutline
                    className={estilos.pesoAltura__container__icon}
                  />
                  <a>{presoReal} Kg</a>
                </div>
              </div>
              <div className={estilos.altura}>
                <a className={estilos.peso_altura__titulo}>Height</a>
                <div className={estilos.pesoAltura__container}>
                  <GiThermometerScale
                    className={estilos.pesoAltura__container__icon}
                  />
                  <a>{alturaReal} m</a>
                </div>
              </div>
              <div className={estilos.habilidades}>
                <a className={estilos.peso_altura__titulo}>Moves</a>
                <a>{habilidade1}</a>
                <a>{habilidade2}</a>
              </div>
            </div>
          </div>
          <div className={estilos[`${tipo1}__status`]}>
            <h2 className={estilos[`${tipo1}__status__titulo`]}>Base Stats</h2>
            <Box className={estilos.status__dados}>
              <div className={estilos.graficos}>
                <div className={estilos.titulo__atributos}>HP</div>
                <div>
                  <CirculoStatusHP value={hpReal / 2} />
                </div>
              </div>
              <div className={estilos.graficos}>
                <div>ATK</div>
                <div>
                  <CirculoStatusATK value={attackReal / 2} />
                </div>
              </div>
              <div className={estilos.graficos}>
                <div>DEF</div>
                <div>
                  <CirculoStatusDEF value={defenseReal / 2} />
                </div>
              </div>
              <div className={estilos.graficos}>
                <div>SATK</div>
                <div>
                  <CirculoStatusSATK value={eAttackReal / 2} />
                </div>
              </div>
              <div className={estilos.graficos}>
                <div>SDEF</div>
                <div>
                  <CirculoStatusSDEF value={eDefenseReal / 2} />
                </div>
              </div>
              <div className={estilos.graficos}>
                <div>SPD</div>
                <div>
                  <CirculoStatusSPD value={speedReal / 2} />
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
