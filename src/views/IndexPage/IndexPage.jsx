import { useContext } from "react";
import { LanguageSelector } from "views/_components";
import { I18nContext, ThemeContext, UserPreferencesContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";
import './IndexPage.css';
import { Link, generatePath } from "react-router-dom";
import { range } from "lodash";
import { Routes } from "conf/Routes";

export const IndexPage = () => {
  const { localeStrings } = useContext(I18nContext);
  // const w = useContext(I18nContext);
  // const x = useContext(ThemeContext);
  // const y = useContext(UserPreferencesContext);
  // const z = useContext(ConcentracionParcelariaContext);
  // console.log(w, x, y, z);
  return <section id="page">
      <header>{ localeStrings.ui.header }</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /></nav>
      <main>
        { range(1, 5).map(id => <div key={id}><Link to={ generatePath(Routes.CP_DETAIL, { id }) }>Concentracion Parcelaria {id}</Link></div>) }
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>;
}