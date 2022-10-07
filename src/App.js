import { RouteList } from "conf/Routes";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { EditPage } from "views";
import { LoadingPage, IndexPage, DetailPage } from "views";
import { UserPreferencesContext, I18nContext, ConcentracionParcelariaContext, ThemeContext } from "views/_functions/Contexts";
import { useI18n, useUserPreferences, useTheme, useConcentracionParcelaria } from "views/_functions/Hooks";

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
  const theme = useTheme();
  useEffect(() => {
    if (userPreferences) {
      userPreferences.lang && i18n.setLang(userPreferences.lang);
      userPreferences.theme && theme.setTheme(userPreferences.theme);
    }
  }, [userPreferences.lang, userPreferences.theme]);
  
  const concentracionParcelaria = useConcentracionParcelaria();
  //{ RouteList.map(route => <Route exact key={route.id} path={route.path} element={route.element} />) }
  // <Route exact path="/" element={<IndexPage />} />
  //                     <Route path="/:id" element={<DetailPage />} />
  //                     <Route path="/:id/edit" element={<EditPage />} />
  return (
    <>
      {userPreferences.loaded && i18n.loaded ? (
        <UserPreferencesContext.Provider value={userPreferences}>
          <ConcentracionParcelariaContext.Provider value={concentracionParcelaria}>
              <I18nContext.Provider value={i18n}>
                <ThemeContext.Provider value={theme}>
                  <Router>
                    <Routes>
                      { RouteList.map(route => <Route exact key={route.id} path={route.path} element={route.element} />) }
                    </Routes>
                  </Router>
                </ThemeContext.Provider>
              </I18nContext.Provider>
          </ConcentracionParcelariaContext.Provider>
        </UserPreferencesContext.Provider>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default App;
