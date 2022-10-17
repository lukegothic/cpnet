import { ConcentracionParcelariaRequester } from "./_utils/ConcentracionParcelariaRequester"

export const ConcentracionParcelaria = (() => {
  const ConcentracionParcelariaAPI = {
    get: (id) => {
      return ConcentracionParcelariaRequester.get({ url: `ConcentracionParcelaria/${id}` });
    },
    list: () => {
      return ConcentracionParcelariaRequester.get({ url: `ConcentracionParcelaria` });
    }
  }
  return ConcentracionParcelariaAPI;
})();

