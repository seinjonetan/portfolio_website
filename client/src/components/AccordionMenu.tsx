import { FC, useState } from "react";
import { NavItem } from "./NavItem"; // Adjust the import path as needed
import { ChevronDownIcon } from "lucide-react"; // Import the ChevronDownIcon

interface AccordionMenuProps {
  setIsAboutOpen: (isOpen: boolean) => void;
  theme: string;
  navItems: { name: string; href: string }[]; // Add navItems prop
  aboutItems: { name: string; href: string }[]; // Add aboutItems prop
}

export const AccordionMenu: FC<AccordionMenuProps> = ({
  setIsAboutOpen,
  theme,
  navItems,
  aboutItems,
}) => {
  const [isAboutOpen, setIsAboutOpenLocal] = useState(false);

  return (
    <div className="md:hidden mt-4">
      <ul className="flex flex-col space-y-2">
        <li>
          <button
            onClick={() => setIsAboutOpenLocal(!isAboutOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <NavItem setIsAboutOpen={setIsAboutOpen} href="#">
              {" "}
              About Me <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />{" "}
            </NavItem>
          </button>
          {isAboutOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              {aboutItems.map((item) => (
                <NavItem
                  key={item.name}
                  setIsAboutOpen={setIsAboutOpen}
                  href={item.href}
                >
                  {item.name}
                </NavItem>
              ))}
            </ul>
          )}
        </li>
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
  );
};
