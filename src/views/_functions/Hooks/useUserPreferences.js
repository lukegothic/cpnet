import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { load as loadUserPreferences, save as saveUserPreferences } from "services/UserPreferences";

export const useUserPreferences = () => {
  // TODO: esto debe ser un reducer! debe contener metodos para al menos actualizar el theme y el idioma
  const [userPreferences, setUserPreferences] = useState({ });
  
  useEffect(() => {
    (async () => {
      setUserPreferences(await loadUserPreferences());
    })();
  }, []);

  const setLang = (lang) => {
    console.log(lang);
    saveUserPreferences({ lang });
    setUserPreferences({ ...userPreferences, lang });
  }

  return { ...userPreferences, setLang, loaded: !isEmpty(userPreferences) };
}
