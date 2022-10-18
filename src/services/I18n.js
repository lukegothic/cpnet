import axios from "axios";
import { defaults } from "conf/UserPreferences";

export const getLocaleStrings = async lang => {
  let localeResponse = await axios.get(`/locales/${lang}/strings.json`).catch((e) => console.log(e.toJSON()));
  if (!localeResponse) {  // fallback a idioma por defecto
    localeResponse = await axios.get(`/locales/${defaults.lang}/strings.json`);
  }
  return localeResponse.data;
};
