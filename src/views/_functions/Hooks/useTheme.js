import { useState } from "react";
export const useTheme = () => {
  const [theme, setTheme] = useState();
  // TODO: theme debe ser un objeto mas complejo, que contenga el theme completo (colores...), al igual que i18n. ademas, setTheme debe depender de userPreoferences o al reves
  return { theme, setTheme };
}