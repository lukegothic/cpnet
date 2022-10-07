import { Routes } from "conf/Routes";
import { useContext } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import { LanguageSelector } from "views/_components";
import { I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";

export const EditPage = () => {
  const { localeStrings } = useContext(I18nContext);
  const z = useContext(ConcentracionParcelariaContext);
  console.log(z);
  const { id } = useParams();
  return <section id="page">
      <header>{ localeStrings.ui.header } {id}</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /><br /><Link to={generatePath(Routes.CP_DETAIL, { id })}>VOLVER</Link></nav>
      <main>
        EDITANDO DATOS DE CP {id}<br />
        <label>Nombre <input type={"text"} /></label><br />
        <label>Dir. notification <input type={"text"} /></label>
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>;
}