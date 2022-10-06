import { useContext } from "react"
import { I18nContext } from "views/_functions/Contexts"
import { AvailableLanguages } from 'conf/I18n';
import { LanguageSelectorButton } from "./LanguageSelectorButton.styled";

export const LanguageSelector = () => {
  const { lang, setLang } = useContext(I18nContext);
  return (
    <>
      { AvailableLanguages.map(l => <LanguageSelectorButton active={lang === l} key={l} onClick={() => setLang(l)}>{l.toUpperCase()}</LanguageSelectorButton>) }
    </>
  )
}