import { useContext } from "react";
import { I18nContext } from "views/_functions/Contexts";
import { LanguageSelector, ThemeSelector } from "..";
import './BasePage.css';

export const BasePage = ({ children }) => {
  const i18n = useContext(I18nContext);
  return (
    <section id="page">
      <header>{ "header" /*i18n.ui.header*/ }</header>
      <nav>{ "nav" /*i18n.ui.nav*/ } <LanguageSelector /></nav>
      <main>
        { children }
      </main>
      <footer>{ "footer" /*i18n.ui.footer*/ }</footer>
    </section>
  );
}