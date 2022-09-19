import { useState, useEffect } from "react";
import { UserPreferences } from "services/UserPreferences";

export const useAppData = () => {
  const [appData, setAppData] = useState(null);
  useEffect(() => {
    (async () => {
        const preferences = UserPreferences.read();
        const i18n = await fetch(`conf/i18n/${preferences.lang}/ui.json`);
        setAppData({ preferences, i18n });
    })();
  }, []);

  return { appData };
}
