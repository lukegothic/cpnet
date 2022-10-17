import { AvailableThemes } from "conf/Theme";
import { useContext } from "react";
import { ThemeContext } from "views/_functions/Contexts";

export const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <select defaultValue={theme} onChange={(e) => setTheme(e.target.value)}>{ AvailableThemes.map(t => <option key={t} value={t}>{t}</option>) }</select>
  );
}