import { THEMES } from "conf/Theme";
import { TracasaInstrumentalTheme, GobiernoNavarraTheme } from "views/_theme";

export const getTheme = (theme) => {
  switch(theme) {
    case THEMES.GN:
      return GobiernoNavarraTheme;
    case THEMES.TCSA:
      return TracasaInstrumentalTheme;
    default:
      throw Error(`${theme} theme not available`);
  }
}