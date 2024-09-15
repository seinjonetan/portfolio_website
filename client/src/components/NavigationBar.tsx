import { useState, useEffect } from "react";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { NavItem } from "./NavItem"; // Adjust the import path as needed
import { ModeToggleButton } from "./ModeToggleButton"; // Adjust the import path as needed
import { useTheme } from "../ThemeProvider"; // Import the useTheme hook
import { AccordionMenu } from "./AccordionMenu"; // Import the AccordionMenu component

export function NavigationBar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu
  const { theme } = useTheme(); // Use the useTheme hook

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isAboutOpen) {
      setIsAboutVisible(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsAboutVisible(false);
      }, 50); // Adjust the delay time as needed
    }
    return () => clearTimeout(timeoutId);
  }, [isAboutOpen]);

  const aboutItems = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#work-experience" },
    { name: "Education", href: "/#education" },
  ];

  const navItems = [
    { name: "Research", href: "/research" },
    { name: "Web Scraper", href: "/scrape" },
    { name: "News Temp", href: "/news" },
    { name: "Invoice Generator", href: "/invoice" },
    { name: "Contact Me", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full p-4 z-50 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
          <ul className="hidden md:flex flex-wrap items-center space-x-2 md:space-x-4">
            <NavItem dropdown setIsAboutOpen={setIsAboutOpen} href="#">
              About Me <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              {isAboutVisible && (
                <ul
                  className={`absolute mt-4 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden border z-50 ${
                    theme === "dark"
                      ? "bg-black text-white border-white"
                      : "bg-white text-black border-black"
                  }`}
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  {aboutItems.map((item, index) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          theme === "dark"
                            ? "text-white hover:bg-gray-700 hover:text-white"
                            : "text-black hover:bg-gray-200 hover:text-black"
                        } 
                          ${index === 0 ? "rounded-t-md" : ""} 
                          ${
                            index === aboutItems.length - 1
                              ? "rounded-b-md"
                              : ""
                          }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </NavItem>
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                setIsAboutOpen={setIsAboutOpen}
                href={item.href}
              >
                {item.name}
              </NavItem>
            ))}
          </ul>
        </div>
        <ModeToggleButton />
      </div>
      {isMenuOpen && (
        <AccordionMenu
          setIsAboutOpen={setIsAboutOpen}
          theme={theme}
          navItems={navItems}
          aboutItems={aboutItems}
        />
      )}
      <div
        className={`absolute left-0 right-0 bottom-0 h-px ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
      ></div>
    </nav>
  );
}
