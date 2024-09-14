// ModeToggleButton.tsx
import { NoSsr } from "@mui/base";
import { IconButton, type IconButtonProps } from "@mui/joy";
import { Moon, Sun } from "lucide-react";
import { type FC } from "react";
import { useTheme } from "../ThemeProvider";

export type ModeToggleButtonProps = Omit<IconButtonProps, "children">;
export const ModeToggleButton: FC<ModeToggleButtonProps> = (props) => {
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleTheme}
      sx={{
        border: "2px solid",
        borderColor: isDarkMode ? "white" : "black",
        borderRadius: "20%",
        padding: "8px",
        color: isDarkMode ? "white" : "black", // Set icon color
      }}
      {...props}
    >
      <NoSsr>{isDarkMode ? <Moon /> : <Sun />}</NoSsr>
    </IconButton>
  );
};
