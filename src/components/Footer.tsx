"use client";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  const classes =
    theme === "dark"
      ? "bg-gray-900 text-gray-300 border-gray-700"
      : "bg-white text-gray-700 border-gray-200";

  return (
    <footer  className={`w-full border-t ${classes} mt-auto transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} SmartLearn Hub. All rights reserved.
        </p>
        <nav className="flex gap-4 text-xs mt-2 sm:mt-0">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}
