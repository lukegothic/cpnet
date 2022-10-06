import { HTTPRequester } from "./_utils/HTTPRequester"

export const getConcentracionParcelaria = (id) => {
  // ejemplo de ruta con querystring
  HTTPRequester.get({ url: "ConcentracionParcelaria", data: { id } });
  // ejemplo de ruta cmpleta
  HTTPRequester.get({ url: `ConcentracionParcelaria/${id}` });
}