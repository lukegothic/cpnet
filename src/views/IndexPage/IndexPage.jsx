import { useContext } from "react";
import { I18nContext, ThemeContext, UserPreferencesContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";
import { Link, generatePath } from "react-router-dom";
import { range } from "lodash";
import { Routes } from "conf/Routes";
import { BasePage } from "views/_components";

export const IndexPage = () => {
  // const w = useContext(I18nContext);
  // const x = useContext(ThemeContext);
  // const y = useContext(UserPreferencesContext);
  // const z = useContext(ConcentracionParcelariaContext);
  // console.log(w, x, y, z);
  return <BasePage>
    <div>{ range(1, 5).map(id => <div key={id}><Link to={ generatePath(Routes.CP_DETAIL, { id }) }>Concentracion Parcelaria {id}</Link></div>) }</div>
  </BasePage>;
}