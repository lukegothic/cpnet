import { HTTPRequester } from "./HTTPRequester";

export const ConcentracionParcelariaRequester = new HTTPRequester({ url: process.env.REACT_APP_CPENDPOINT, errorhandler: error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
        // token request // update token
        const getToken = PokeApiRequester.get({ url: "generation/1" }).then(data => PokeApiRequester.token = data.name);
        return getToken.then(() => PokeApiRequester.retry({ request: error.config }));
    }
    return Promise.reject(error);
}});
