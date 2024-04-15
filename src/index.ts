import { cookies } from "next/headers";

export async function generateThemeMetadata(themeColors: {
  [key: string]: string;
}) {
  const theme = cookies().get("customTheme")?.value;

  return {
    other: theme && {
      "theme-color": theme || themeColors[theme],
    },
  };
}

export async function getHTMLProps() {
  const theme = cookies().get("customTheme")?.value;

  return {
    "data-theme": theme || "dark",
  };
}

export { useThemeContext } from "./context";
