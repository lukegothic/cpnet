import { useState } from "react";
import { ConcentracionParcelaria as ConcentracionParcelariaEntity } from 'entitys';
export const useConcentracionParcelaria = () => {
  // hook que guarda estado en memoria (y repo) de la concentracion con la que se esta trabajando
  // sirve para: 
  // - almacenar cambios no persistidos
  // - recuperar cambios al recuperar sesion
  const [concentracionParcelaria, setConcentracionParcelaria] = useState(new ConcentracionParcelariaEntity());
  return { concentracionParcelaria, setConcentracionParcelaria };
}