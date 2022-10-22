import { RouteList } from "conf/Routes";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { getTheme } from "services/Theme";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "views";
import { UserPreferencesContext, I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";
import { useApp, useConcentracionParcelaria } from "views/_functions/Hooks";
import { GlobalStyle } from "views/_theme/GlobalStyle";

const App = () => {
  const { userPreferences, i18n, loaded: isAppLoaded } = useApp();
  console.log("render");  // solo debe salir un render por operacion, eliminar cuando no haga falta pruebas
  const concentracionParcelaria = useConcentracionParcelaria();

  // THINK: considerar persistir el estado de react en localStorage para recuperarlo tras sesiones

  return (
    <>
      <GlobalStyle />
      { isAppLoaded ? (
        <UserPreferencesContext.Provider value={userPreferences}>
          <ConcentracionParcelariaContext.Provider value={concentracionParcelaria}>
            <I18nContext.Provider value={i18n}>
              <ThemeProvider theme={getTheme(userPreferences.theme)}>
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
