import { HTTPRequester } from "./HTTPRequester";

export const ConcentracionParcelariaRequester = new HTTPRequester({ url: process.env.REACT_APP_CPENDPOINT, errorhandler: error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
        // token request // update token
        // TODO: cfg url y propiedad token (las dos siguientes lineas)
        const url = "auth/token";
        const token_prop = "token";
        const getToken = ConcentracionParcelariaRequester.get({ url }).then(data => ConcentracionParcelariaRequester.token = data[token_prop]);
        return getToken.then(() => ConcentracionParcelariaRequester.retry({ request: error.config }));
    }
    return Promise.reject(error);
}});
