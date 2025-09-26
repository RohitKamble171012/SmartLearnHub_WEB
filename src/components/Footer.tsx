"use client";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  const bg =
    theme === "dark"
      ? "bg-gray-900 text-gray-300 border-gray-700"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <footer className={`w-full border-t ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        
        {/* Brand - Compact */}
        <div>
          <h2 className="text-lg font-bold gradient-text">🎓 SmartLearn Hub</h2>
          <p className="mt-2 text-xs leading-relaxed opacity-80">
            Empowering students with AI-powered tools, curated notes, quizzes, and personalized progress tracking.
          </p>
        </div>

        {/* Quick Links - Horizontal */}
        <nav aria-label="Footer Navigation" className="flex flex-col">
          <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide opacity-70">Quick Links</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/notes" className="hover:underline transition-colors duration-200 opacity-80 hover:opacity-100 whitespace-nowrap">
              📘 Notes
            </Link>
            <Link href="/quiz" className="hover:underline transition-colors duration-200 opacity-80 hover:opacity-100 whitespace-nowrap">
              🧩 Quizzes
            </Link>
            <Link href="/ai-assistant" className="hover:underline transition-colors duration-200 opacity-80 hover:opacity-100 whitespace-nowrap">
              🤖 AI Assistant
            </Link>
            <Link href="/progress" className="hover:underline transition-colors duration-200 opacity-80 hover:opacity-100 whitespace-nowrap">
              📊 Progress
            </Link>
          </div>
        </nav>

        {/* Notice - Compact */}
        <div>
          <h3 className="font-semibold mb-2 text-xs uppercase tracking-wide opacity-70">Notice</h3>
          <p className="text-xs leading-relaxed opacity-80">
            ⚠ Some charts may not render properly in <strong>dark mode</strong>.
          </p>
        </div>
      </div>

      {/* Bottom Bar - Minimal */}
      <div
        className={`text-center text-xs py-3 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        } opacity-60`}
      >
        © {new Date().getFullYear()} SmartLearn Hub. All rights reserved.
      </div>
    </footer>
  );
}
