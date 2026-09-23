/* eslint-disable react-refresh/only-export-components --
   this file intentionally keeps the provider, the hook, and the small
   chart color palette together since they're all "theme" concerns. */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "placement-tracker-theme"; // stores "light" | "dark"

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
}

// Colors used by Recharts, kept in one place so charts stay readable
// in both themes without hardcoding hex values inside chart components.
export const chartPalette = {
  light: { grid: "#e2e2e0", axis: "#666666", line: "#111111", accent: "#b5651d" },
  dark: { grid: "#2a2a2a", axis: "#999999", line: "#f5f5f3", accent: "#e08a45" },
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  // "system" mode means we should keep following the OS setting.
  const [isSystem, setIsSystem] = useState(() => !localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!isSystem) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setThemeState(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isSystem]);

  function setTheme(next) {
    if (next === "system") {
      setIsSystem(true);
      localStorage.removeItem(STORAGE_KEY);
      setThemeState(getSystemTheme());
    } else {
      setIsSystem(false);
      localStorage.setItem(STORAGE_KEY, next);
      setThemeState(next);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, isSystem, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside a ThemeProvider");
  return ctx;
}
