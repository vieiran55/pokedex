import { useNavigate } from "react-router-dom";
import estilos from "./Header.module.scss";


export default function Header(){
  const navigate = useNavigate();
  return(
    <div className={estilos.cabecalho}>
      <div className={estilos.imagemDeFundo} onClick={() => {
        navigate("/");
      }}/>
    </div>
  );
}