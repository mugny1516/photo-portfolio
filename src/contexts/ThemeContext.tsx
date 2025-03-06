import React, { createContext, useContext, useMemo } from "react";

type ThemeContextProps = {
  backgroundColor: string;
  textColor: string;
};

const ThemeContext = createContext<ThemeContextProps>({
  backgroundColor: "white",
  textColor: "black",
});

type ThemeProviderProps = {
  backgroundColor: string;
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  backgroundColor,
  children,
}) => {
  const textColor = backgroundColor === "black" ? "white" : "black";
  const value = useMemo(
    () => ({ backgroundColor, textColor }),
    [backgroundColor]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
