import { FC } from "react";
import { useTheme } from "../ThemeProvider"; // Import the useTheme hook

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  setIsAboutOpen?: (isOpen: boolean) => void;
  dropdown?: boolean;
}

export const NavItem: FC<NavItemProps> = ({
  href,
  children,
  setIsAboutOpen,
  dropdown,
}) => {
  const { theme } = useTheme(); // Use the useTheme hook

  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-full transition-colors duration-200 ${
        theme === "dark"
          ? "text-white hover:text-white hover:bg-gray-700"
          : "text-black hover:text-black hover:bg-gray-200"
      }`}
      onMouseEnter={() => dropdown && setIsAboutOpen && setIsAboutOpen(true)}
      onMouseLeave={() => dropdown && setIsAboutOpen && setIsAboutOpen(false)}
    >
      {children}
    </a>
  );
};
