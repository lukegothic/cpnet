import { HTTPRequester } from "./HTTPRequester";

export const GeoserverRequester = new HTTPRequester({ url: process.env.REACT_APP_GEOSERVERENDPOINT });
