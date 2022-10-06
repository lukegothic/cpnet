import { useState, useEffect } from "react";
import axios from 'axios';
import { defaults } from "conf/UserPreferences";

export const useUserPreferences = () => {
  // TODO: esto es un reducer!
  const [userPreferences, setUserPreferences] = useState({});
  useEffect(() => {
    (async () => {
      // TODO: modulo carga preferencias mixto ddbb + localstorage
      const localUserPreferences = JSON.parse(localStorage.getItem("userPreferences")) ?? {};
      setUserPreferences({ ...defaults, ...localUserPreferences });
    })();
  }, []);

  return { ...userPreferences, loaded: !!userPreferences.lang };
}
