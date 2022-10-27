import { useContext } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import { BasePage } from "views/_components";
import { I18nContext, ConcentracionParcelariaContext } from "views/_functions/Contexts";

export const EditPage = () => {
  const i18n = useContext(I18nContext);
  const z = useContext(ConcentracionParcelariaContext);
  console.log(z);
  const { id } = useParams();
  return <BasePage>
    <div>EDITANDO DATOS DE CP {id}<br />
        <label>Nombre <input type={"text"} /></label><br />
        <label>Dir. notification <input type={"text"} /></label></div>
</BasePage>;
}