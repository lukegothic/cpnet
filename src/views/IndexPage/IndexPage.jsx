import { useContext } from "react";
import { I18nContext, ThemeContext, UserPreferencesContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";
import { Link, generatePath } from "react-router-dom";
import { range } from "lodash";
import { Routes } from "conf/Routes";
import { BasePage } from "views/_components";
import { ConcentracionParcelaria } from 'repositories/ConcentracionParcelaria';

export const IndexPage = () => {
  const { localeStrings } = useContext(I18nContext);
  // const w = useContext(I18nContext);
  // const x = useContext(ThemeContext);
  // const y = useContext(UserPreferencesContext);
  // const z = useContext(ConcentracionParcelariaContext);
  // console.log(w, x, y, z);
  // TODO: await 
  // const x = ConcentracionParcelaria.get(1);
  return <BasePage>
    <div>{ range(1, 5).map(id => <div key={id}><Link to={ generatePath(Routes.CP_DETAIL, { id }) }>Concentracion Parcelaria {id}</Link></div>) }</div>
  </BasePage>;
}