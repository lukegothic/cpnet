import { PokeApiRequester } from "./_utils/PokeApiRequester"

export const PokeApi = (() => {
  const PokeApiAPI = {
    getPokemon: async (name) => {
      return await PokeApiRequester.get({ url: `pokemon/${name}` });
    },
    list: () => {
      return PokeApiRequester.get({ url: `pokemon` });
    }
    // TODO: COMO MUCHO PARA EL SERVICIO Y FRONTAL si no queremos que haga autologin, TENER AQUI UN METODO QUE PERMITA COMPROBAR SI TENEMOS UN TOKEN VALIDO
    /*
    token: () => {
      return !!PokeApiRequester.token;
    }
    */
  }
  return PokeApiAPI;
})();

