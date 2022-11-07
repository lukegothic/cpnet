import { WFSRequester } from "./WFSRequester";

export const ConcentracionParcelariaWFSRequester = new WFSRequester({ url: process.env.REACT_APP_CPENDPOINT });