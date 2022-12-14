import { defaults, localStorageKey } from "conf/UserPreferences";

export const load = async () => {
  // THINK: van a estar las preferencias de usuario en la DDBB también?
  const userPreferences = { ...defaults, ...(JSON.parse(localStorage.getItem(localStorageKey)) ?? {}) };
  return userPreferences;
}

export const save = async (userPreferences) => {
  const currentUserPreferences = await load();
  try {
    localStorage.setItem(localStorageKey, JSON.stringify({ ...currentUserPreferences, ...userPreferences }));
    return true;
  } catch {   // Storage is full
    return false;
  }
}