import { THEMES } from "./Theme";

export const localStorageKey = "user_preferences";

// THINK: definicion de preferencias de usuario
export const defaults = {
  lang: window.navigator.language.substring(0, 2),
  theme: THEMES.GN
}