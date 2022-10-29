import { HTTPRequester } from "./HTTPRequester";

export const PokeApiRequester = new HTTPRequester({ url: process.env.REACT_APP_POKEAPI, errorhandler: error => {
    // TODO: ESTO FUNCIONA, YAY, pero hay que obtener primero el token y luego hacer retry OK
    // TODO: ADEMAS, LIMITAR EL RETRY A PETICIONES 401
    const status = error.response ? error.response.status : null;
    if (status === 404) {
        // la siguiente linea no hace falta
        error.config = { ...error.config, url: "https://pokeapi.co/api/v2/pokemon/ditto" };
        // token request // update token
        const getToken = PokeApiRequester.get({ url: "generation/1" }).then(data => PokeApiRequester.token = data.name);
        return getToken.then(() => PokeApiRequester.retry({ request: error.config }));
    }
    return Promise.reject(error);
}});
