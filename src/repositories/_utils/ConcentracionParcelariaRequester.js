import { HTTPRequester } from "./HTTPRequester";

export const ConcentracionParcelariaRequester = new HTTPRequester({ url: process.env.REACT_APP_CPENDPOINT });
