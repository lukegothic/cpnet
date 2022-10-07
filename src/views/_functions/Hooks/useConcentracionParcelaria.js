import { useState } from "react";
import { ConcentracionParcelaria as ConcentracionParcelariaEntity } from 'entitys';
export const useConcentracionParcelaria = () => {
  // TODO: considerar que este estado es un reducer y que sea un objeto mas complejo, 
  // TODO: este hook sirve para que el router lea donde estamos
  const [concentracionParcelaria, setConcentracionParcelaria] = useState(new ConcentracionParcelariaEntity());
  // TODO: return los reducers que modifiquen los datos de cp
  return { concentracionParcelaria, setConcentracionParcelaria };
}