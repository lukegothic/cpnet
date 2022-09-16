// TODO: preferencias de usuario
export const UserPreferences = {
  read: () => {
    return {
      lang: window.navigator.language.substring(0, 2)
    }
  }
}