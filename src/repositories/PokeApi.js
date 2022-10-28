import { PokeApiRequester } from "./_utils/PokeApiRequester"

export const PokeApi = (() => {
  const PokeApiAPI = {
    getPokemon: (name) => {
      return PokeApiRequester.get({ url: `pokemon/${name}` });
    },
    list: () => {
      return PokeApiRequester.get({ url: `pokemon` });
    }
  }
  return PokeApiAPI;
})();

