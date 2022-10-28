import { Link, generatePath } from "react-router-dom";
import { range } from "lodash";
import { Routes } from "conf/Routes";
import { BasePage } from "views/_components";
import { useEffectOnce } from "react-use";
import { PokeApi } from "repositories/PokeApi";

export const IndexPage = () => {
  // const w = useContext(I18nContext);
  // const x = useContext(ThemeContext);
  // const y = useContext(UserPreferencesContext);
  // const z = useContext(ConcentracionParcelariaContext);
  // console.log(w, x, y, z);

  useEffectOnce(() => {
    (async () => {
      const poke = await PokeApi.getPokemon("ditto2");
      console.log(poke);
    })();
  });

  return <BasePage>
    <div>{ range(1, 5).map(id => <div key={id}><Link to={ generatePath(Routes.CP_DETAIL, { id }) }>Concentracion Parcelaria {id}</Link></div>) }</div>
  </BasePage>;
}