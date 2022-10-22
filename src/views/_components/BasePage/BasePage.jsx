import { useContext } from "react";
import { I18nContext } from "views/_functions/Contexts";
import { LanguageSelector, ThemeSelector } from "..";
import './BasePage.css';
import { Main } from "./BasePage.styled";

export const BasePage = ({ children }) => {
  const i18n = useContext(I18nContext);
  return (
    <section id="page">
      <header>{ i18n.ui.header }</header>
      <nav>{ i18n.ui.nav } <LanguageSelector /><ThemeSelector /></nav>
      <Main>
        { children }
      </Main>
      <footer>{ i18n.ui.footer }</footer>
    </section>
  );
}