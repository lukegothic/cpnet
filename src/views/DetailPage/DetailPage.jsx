import { Routes } from "conf/Routes";
import { useContext } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import { LanguageSelector } from "views/_components";
import { I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";

export const DetailPage = () => {
  const { localeStrings } = useContext(I18nContext);
  const z = useContext(ConcentracionParcelariaContext);
  console.log(z);
  const { id } = useParams();
  return <section id="page">
      <header>{ localeStrings.ui.header } {id}</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /><br /><Link to={ Routes.APP_INDEX }>VOLVER</Link></nav>
      <main>
        DATOS DE CP {id}<br />
        <Link to={ generatePath(Routes.CP_EDIT, { id }) }>EDITAR</Link>
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>;
}