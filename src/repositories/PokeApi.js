import { PokeApiRequester } from "./_utils/PokeApiRequester"

export const PokeApi = (() => {
  const PokeApiAPI = {
    getPokemon: async (name) => {
      return await PokeApiRequester.get({ url: `pokemon/${name}` });
    },
    list: () => {
      return PokeApiRequester.get({ url: `pokemon` });
    }
  }
  return PokeApiAPI;
})();

