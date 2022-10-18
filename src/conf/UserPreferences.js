import { THEMES } from "./Theme";

export const localStorageKey = "user_preferences";

export const defaults = {
  lang: window.navigator.language.substring(0, 2),
  theme: THEMES.GN
}