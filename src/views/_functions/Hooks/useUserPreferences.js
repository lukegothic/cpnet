import { useState, useEffect } from "react";
import axios from 'axios';
import { defaults } from "conf/UserPreferences";
import { isEmpty } from "lodash";

export const useUserPreferences = () => {
  // TODO: esto debe ser un reducer!
  // TODO: debe contener metodos para al menos actualizar el theme y el idioma
  const [userPreferences, setUserPreferences] = useState({ });
  useEffect(() => {
    (async () => {
      // TODO: modulo carga preferencias mixto ddbb + localstorage
      const localUserPreferences = JSON.parse(localStorage.getItem("userPreferences")) ?? {};
      setUserPreferences({ ...defaults, ...localUserPreferences });
    })();
  }, []);
  

  return { ...userPreferences, loaded: !isEmpty(userPreferences),  };
}
