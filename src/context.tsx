"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<{
  theme: unknown;
  applyTheme: (theme: string) => void;
}>({
  theme: "dark",
  applyTheme: (newTheme: string) => null,
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<unknown | null>(null);

  useEffect(() => {
    const customTheme = window.document.cookie
      .split("; ")
      .find((row) => row.startsWith("customTheme="))
      ?.split("=")[1];

    setTheme(customTheme);
  }, []);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    window.document.cookie = `customTheme=${newTheme}`;

    let metaTag = document
      .querySelector("head")
      ?.querySelector("meta[name=theme-color]");

    if (metaTag instanceof Element) metaTag.setAttribute("content", newTheme);
    else {
      const metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "theme-color");
      metaTag.setAttribute("content", newTheme);
      document.querySelector("head")?.appendChild(metaTag);
    }

    document.querySelector("html")?.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme ?? "dark",
        applyTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
