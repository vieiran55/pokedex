import IFoto from "./IFoto";
import IHabilidades from "./IHabilidades";
import IStatus from "./IStatus";
import ITipo from "./ITipo";

/* eslint-disable semi */
export default interface IData {
  abilities: IHabilidades[]
  id: number
  name: string
  order: number
  sprites: IFoto[]
  status: IStatus[]
  tipo: ITipo[]
  color: string
}