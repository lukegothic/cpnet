import { useContext } from "react"
import { AvailableLanguages } from 'conf/I18n';
import { LanguageSelectorButton } from "./LanguageSelectorButton.styled";
import { UserPreferencesContext } from "views/_functions/Contexts";

export const LanguageSelector = () => {
  const { lang, setLang } = useContext(UserPreferencesContext);
  return (
    <>
      { AvailableLanguages.map(l => <LanguageSelectorButton active={lang === l} key={l} onClick={() => setLang(l)}>{l.toUpperCase()}</LanguageSelectorButton>) }
    </>
  )
}