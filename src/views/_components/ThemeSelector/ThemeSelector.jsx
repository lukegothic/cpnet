import { AvailableThemes } from "conf/Theme";
import { useContext } from "react";
import { UserPreferencesContext } from "views/_functions/Contexts";

export const ThemeSelector = () => {
  const { theme, setTheme } = useContext(UserPreferencesContext);
  return (
    <select defaultValue={theme} onChange={(e) => setTheme(e.target.value)}>{ AvailableThemes.map(t => <option key={t} value={t}>{t}</option>) }</select>
  );
}