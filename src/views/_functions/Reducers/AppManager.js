// actions
// una action siempre es: { type: funcionAction, payload: JSON con los datos recibidos en los parametros }
export const init = (userPreferences, i18n) => ({
  type: init,
  payload: { userPreferences, i18n }
});

export const changeLang = (lang, i18n) => ({
  type: changeLang,
  payload: { lang, i18n }
});

export const changeTheme = theme => ({
  type: changeTheme,
  payload: { theme }
});

// manager
// state es el estado anterior y se inyecta de manera automática, action es una accion valida de las acciones del manager
export const manager = (state, action) => {
  switch (action.type) {
    case init:
      return action.payload;
    case changeLang:
      return {
        userPreferences: {
          ...state.userPreferences,
          lang: action.payload.lang
        },
        i18n: action.payload.i18n
      };
    case changeTheme:
      return {
        userPreferences: {
          ...state.userPreferences,
          theme: action.payload.theme
        },
        i18n: { ...state.i18n }
      };
    default:
      throw new Error("appManager: Undefined action");
  }
};
