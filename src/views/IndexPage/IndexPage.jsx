import { useContext } from "react";
import { getConcentracionParcelaria } from "repositories";
import { LanguageSelector } from "views/_components";
import { I18nContext } from "views/_functions/Contexts";
import './IndexPage.css';

export const IndexPage = () => {
  const { localeStrings } = useContext(I18nContext);
  const cpdata = getConcentracionParcelaria(1);
  return <section id="page">
      <header>{ localeStrings.ui.header }</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /></nav>
      <main>{ localeStrings.ui.main }</main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>;
}