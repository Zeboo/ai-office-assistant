export type ThemeMode = "dark" | "light";

export const darkColors = {
  background: "#0B0B0B",
  surface: "#111111",
  surfaceLight: "#181818",
  primary: "#39FF88",
  black: "#000000",
  text: "#FFFFFF",
  textSecondary: "#B8B8B8",
  textMuted: "#777777",
  border: "#292929",
};

export const lightColors = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  surfaceLight: "#EEF1F4",
  primary: "#16A34A",
  black: "#000000",
  text: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#6B7280",
  border: "#D9DEE5",
};

// Default theme
export const colors = darkColors;

// Get colors according to selected theme
export const getColors = (theme: ThemeMode) => {
  return theme === "dark" ? darkColors : lightColors;
};