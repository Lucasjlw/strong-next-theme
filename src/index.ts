import { ThemeProvider, useThemeContext } from "./context";

import { cookies } from "next/headers";

async function generateThemeMetadata(themeColors: { [key: string]: string }) {
  const theme = cookies().get("customTheme")?.value;

  return {
    other: theme && {
      "theme-color": theme || themeColors[theme],
    },
  };
}

async function getHTMLProps() {
  const theme = cookies().get("customTheme")?.value;

  return {
    "data-theme": theme || "dark",
  };
}

module.exports = {
  generateThemeMetadata,
  getHTMLProps,
  ThemeProvider,
  useThemeContext,
};
