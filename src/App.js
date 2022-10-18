import { RouteList } from "conf/Routes";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { getLocaleStrings } from "services/I18n";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "views";
import { UserPreferencesContext, I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";
import { useUserPreferences, useConcentracionParcelaria } from "views/_functions/Hooks";
import { GlobalStyle, LightTheme } from "views/_theme";

const App = () => {
  console.log("rerender loop");
  // CON ESTO YA REACCIONA, NO HACE FALTA MAS HOOKS
  const userPreferences = useUserPreferences();
  // Estos valores se computan tras obtener el user preferences
  // Se puede hacer aqui o en el hook de useUserPreferences y devolverlos
  const i18n = userPreferences.lang ? getLocaleStrings(userPreferences.lang) : null;
  const theme = userPreferences.theme ? LightTheme : null;
/*
  useEffect(() => {
    console.log("entro mounted", userPreferences);
    if (userPreferences.loaded) {
      //userPreferences.lang && i18n.setLang(userPreferences.lang);
      //userPreferences.theme && theme.setTheme(userPreferences.theme);
    }
  }, [userPreferences.loaded]);
*/

  useEffect(() => {

  }, [userPreferences.lang]);

  useEffect(() => {

  }, [userPreferences.theme]);

  useEffect(() => {
    // codigo de inicializacion de la app, si lo hay
  }, []);
  
  const concentracionParcelaria = useConcentracionParcelaria();
  return (
    <>
      <GlobalStyle />
      {userPreferences.loaded && i18n && theme ? (
        <UserPreferencesContext.Provider value={userPreferences}>
          <ConcentracionParcelariaContext.Provider value={concentracionParcelaria}>
            <I18nContext.Provider value={i18n}>
              <ThemeProvider theme={theme}>
                <Router>
                  <Routes>
                    { RouteList.map(route => <Route exact key={route.id} path={route.path} element={route.element} />) }
                  </Routes>
                </Router>
              </ThemeProvider>
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
