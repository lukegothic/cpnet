import { Routes } from "conf/Routes";
import { useContext } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import { BasePage } from "views/_components";
import { I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";

export const DetailPage = () => {
  const { localeStrings } = useContext(I18nContext);
  const z = useContext(ConcentracionParcelariaContext);
  console.log(z);
  const { id } = useParams();
  return <BasePage>
    DATOS DE CP {id}<br />
    <Link to={ generatePath(Routes.CP_EDIT, { id }) }>EDITAR</Link>
  </BasePage>
}