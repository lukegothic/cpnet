import { useState, useEffect } from "react";
import axios from "axios";
import { defaults } from 'conf/UserPreferences';
import { isEmpty } from "lodash";
import { useUserPreferences } from "./useUserPreferences";

const getLocaleStrings = async lang => {
  let localeResponse = await axios.get(`/locales/${lang}/strings.json`).catch((e) => console.log(e.toJSON()));
  if (!localeResponse) {  // fallback a idioma por defecto
    localeResponse = await axios.get(`/locales/${defaults.lang}/strings.json`);
  }
  return localeResponse.data;
};
export const useI18n = () => {
  const [strings, setStrings] = useState({ });
  const userPreferences = useUserPreferences();
  // si el usuario cambia de idioma, cargamos los strings de ese idioma
  useEffect(() => {
    console.log("cambio lang", userPreferences.lang);
    userPreferences.lang && (async () => {
      setStrings(await getLocaleStrings(userPreferences.lang));
    })();
  }, [userPreferences.lang]);
  return { strings, loaded: !isEmpty(strings) };
};
