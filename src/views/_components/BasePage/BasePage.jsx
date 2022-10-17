import { useContext } from "react";
import { I18nContext } from "views/_functions/Contexts";
import { LanguageSelector, ThemeSelector } from "..";
import './BasePage.css';

export const BasePage = ({ children }) => {
  const { localeStrings } = useContext(I18nContext);
  return (
    <section id="page">
      <header>{ localeStrings.ui.header }</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /><ThemeSelector /></nav>
      <main>
        { children }
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>
  );
}