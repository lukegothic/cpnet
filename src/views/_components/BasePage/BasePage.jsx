import { useContext } from "react";
import { I18nContext } from "views/_functions/Contexts";
import { LanguageSelector } from "..";

export const BasePage = ({ children }) => {
  const { localeStrings } = useContext(I18nContext);
  return (
    <section id="page">
      <header>{ localeStrings.ui.header }</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /></nav>
      <main>
        { children }
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>
  );
}