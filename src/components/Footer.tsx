"use client";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  const bg =
    theme === "dark"
      ? "bg-gray-900 text-gray-300 border-gray-700"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <footer className={`w-full border-t ${bg} mt-auto`}>
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">
        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} SmartLearn Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
