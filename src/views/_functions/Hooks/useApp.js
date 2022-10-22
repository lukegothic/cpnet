import { useReducer, useCallback } from "react";
import { isEmpty } from "lodash";
import { load as loadUserPreferences, save as saveUserPreferences } from "services/UserPreferences";
import { getLocaleStrings } from "services/I18n";
import { useEffectOnce } from "react-use";
import { manager as appManager, init, changeLang, changeTheme } from "views/_functions/Reducers/AppManager";

export const useApp = () => {
  const [app, manageApp] = useReducer(appManager, { });
  useEffectOnce(() => {
    (async () => {
      const userPrefs = await loadUserPreferences();
      const i18n = await getLocaleStrings(userPrefs.lang);
      manageApp(init(userPrefs, i18n));
    })();
  });

  const setLang = useCallback(async (lang) => {
    console.log("setlang", lang);
    const saveSuccess = await saveUserPreferences({ lang });
    if (saveSuccess) {
      const i18n = await getLocaleStrings(lang);
      manageApp(changeLang(lang, i18n));
    }
  });

  const setTheme = useCallback(async (theme) => {
    console.log("settheme", theme);
    const saveSuccess = await saveUserPreferences({ theme });
    if (saveSuccess) {
      manageApp(changeTheme(theme));
    }
  });

  return {
    userPreferences: {
      ...app.userPreferences,
      setLang,
      setTheme
    },
    i18n: {
      ...app.i18n
    },
    loaded: !isEmpty(app)
  };
}
