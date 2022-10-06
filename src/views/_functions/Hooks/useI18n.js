import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const getLocale = async lang => {
  let localeResponse = await axios.get(`locales/${lang}/strings.json`);
  if (localeResponse.status !== 200) {
    // TODO: fallback a idioma por defecto?
  }
  return localeResponse.data;
};
// TODO: opcionalmente se puede mandar un parametro para inicializar y cargaria por defecto ese idioma
export const useI18n = (/*{ defaultLang = window.navigator.language.substring(0, 2) } = {}*/) => {
  // objeto i18n complejo, pero no como para hacer un reducer
  const [i18n, setI18n] = useState({ lang: null });
  // metodo de ayuda para cambiar el idioma, dado que localeStrings depende de lang, hay que hacer una funcion intermedia
  const setLang = async lang => {
    setI18n({ lang, localeStrings: await getLocale(lang) });
    // TODO: usar hook de usePreferences para guardar la preferencia, por ahora se guarda en local
    localStorage.setItem("userPreferences", JSON.stringify({ lang }));
  }
  // la primera vez, llamar manualmente a la carga de los strings
  useEffect(() => {
    i18n.lang && setLang(i18n.lang);
  }, []);

  return { ...i18n, loaded: !!i18n.lang && !!i18n.localeStrings, setLang };
};
