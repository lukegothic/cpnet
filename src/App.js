import { useEffect } from "react";
import { LoadingPage, IndexPage } from "views";
import { UserPreferencesContext, I18nContext } from "views/_functions/Contexts";
import { useI18n, useUserPreferences } from "views/_functions/Hooks";

const App = () => {
  // TODO: objeto global appData para que solo renderice 1 vez?
  // ahora mismo el ciclo de vida de la página es:
  // 1. render inicial, sin nada
  // 2. re-render cuando llega el i18n
  // 3. re-render cuando llegan las userpreferences
  // el overhead no es alto, pero se puede considerar si hay algun mecanismo
  const userPreferences = useUserPreferences();
  // TODO: i18n depende de userPreferences asi que hay que hacerlo depender
  const i18n = useI18n();
  useEffect(() => {
    //i18n.setLang(window.navigator.language.substring(0, 2));
    userPreferences && userPreferences.lang && i18n.setLang(userPreferences.lang);
  }, [userPreferences.lang]);
  return (
    <>
      {userPreferences && i18n.loaded ? (
        <UserPreferencesContext.Provider value={userPreferences}>
          <I18nContext.Provider value={i18n}>
            <IndexPage />
          </I18nContext.Provider>
        </UserPreferencesContext.Provider>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default App;
