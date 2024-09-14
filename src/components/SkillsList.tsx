import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

interface SkillsListProps {
  id?: string;
  categories: {
    name: string;
    skills: {
      name: string;
      link?: string;
    }[];
  }[];
}

export default function SkillsList({ id, categories }: SkillsListProps) {
  const { theme } = useTheme();

  return (
    <div
      id={id}
      className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className={`p-6 rounded-lg shadow-md space-y-4 ${
                theme === "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    {skill.link ? (
                      <a
                        href={skill.link}
                        className={`inline-block px-3 py-1 rounded-full text-primary-foreground hover:bg-blue-600 transition-colors duration-200
                            ${
                              theme === "dark" ? "bg-blue-500" : "bg-gray-200"
                            }`}
                      >
                        {skill.name}
                      </a>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-secondary-foreground
                      ${theme === "dark" ? "bg-blue-500" : "bg-gray-200"}`}
                      >
                        {skill.name}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
