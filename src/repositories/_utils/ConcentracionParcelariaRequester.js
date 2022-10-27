import { HTTPRequester } from "./HTTPRequester";
// TODO: esto tambien tiene new WFSRequester({ feature, xxxx });
export const ConcentracionParcelariaRequester = new HTTPRequester({ url: process.env.REACT_APP_CPENDPOINT });
 