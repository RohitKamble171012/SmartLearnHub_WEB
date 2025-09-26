"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme(); // ✅ Context state (no reload)
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const learningEmojis = ["🧠", "⚡", "🔥", "💡", "🎯", "🌟"];

  // Emoji cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % learningEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get user only once (no reloads, guarded)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const first = user.fullName?.split(" ")[0] || "";
        setFirstName(first);
      }
      setLoading(false);
    }
  }, []);

  // 🎨 Theme-based classes
  const themeBg =
    theme === "dark"
      ? "bg-gray-900"
      : theme === "blue"
      ? "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"
      : theme === "purple"
      ? "bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100"
      : "bg-gradient-to-br from-gray-50 via-pink-50 to-purple-100";

  const themeText = theme === "dark" ? "text-white" : "text-gray-900";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 10 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 24px rgba(0,0,0,0.18)" },
    tap: { scale: 0.96 },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 12 },
    },
  };

  const aiBenefits = [
    { icon: "⚡", title: "Instant Feedback", desc: "Get immediate responses to your questions" },
    { icon: "🎯", title: "Custom Study Paths", desc: "Personalized learning journeys just for you" },
    { icon: "📊", title: "Progress Analytics", desc: "Track your learning milestones in real-time" },
    { icon: "🔄", title: "Adaptive Learning", desc: "Content adjusts to your pace and style" },
    { icon: "🎮", title: "Gamified Experience", desc: "Learn through engaging, game-like activities" },
    { icon: "🌟", title: "Smart Recommendations", desc: "AI suggests what to learn next" },
  ];

  // ✅ Render nothing while loading (prevents flicker/reload)
  if (loading) return null;

  return (
    <div className={`min-h-screen overflow-hidden relative ${themeBg} ${themeText}`}>
      {/* Animated Background Bubbles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute w-[60%] h-[60%] top-[5%] left-[10%] bg-gradient-to-br from-blue-200/50 via-pink-200/30 to-purple-200/10 dark:from-blue-900/10 dark:to-purple-900/5 backdrop-blur-[80px] rounded-full blur-2xl"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.6, 1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.13 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* HERO Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 min-h-screen">
        {/* Left: Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" as const }}
          className="w-full lg:w-1/2 mb-16 lg:mb-0 flex-shrink-0"
        >
          <div className="relative group">
            <Image
              src="/e-learning_digital_education_2.jpg"
              alt="classroom"
              width={700}
              height={560}
              className="rounded-3xl object-cover w-full h-auto shadow-2xl"
            />
            <motion.div
              className="absolute -bottom-8 -left-8 bg-gradient-to-br from-emerald-500 to-green-400 text-white p-5 rounded-full shadow-2xl"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-4xl">🎓</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 flex flex-col items-start gap-8 lg:pl-14"
        >
          {firstName && (
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold">
              👋 Hello {firstName}
            </motion.h2>
          )}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-transparent mb-2"
          >
            Welcome to
          </motion.h1>
          <motion.div variants={itemVariants} className="flex items-baseline gap-3 relative">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartLearn Hub
            </h2>
            <motion.span
              key={currentEmoji}
              animate={{ rotate: [0, -20, 18, 0] }}
              transition={{ duration: 1.1 }}
              className="align-baseline text-4xl"
            >
              {learningEmojis[currentEmoji]}
            </motion.span>
          </motion.div>
          <motion.p variants={itemVariants} className="text-2xl font-medium leading-relaxed max-w-xl">
            Unleash your potential with{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">
              AI-powered learning
            </span>{" "}
            that adapts to your unique style and accelerates your growth!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg mt-6"
          >
            <Link href="/quiz" prefetch={false} className="w-full">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl font-semibold text-[1.25rem]"
              >
                🧩 Start Quiz
              </motion.button>
            </Link>
            <Link href="/ai-assistant" prefetch={false} className="w-full">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl font-semibold text-[1.25rem]"
              >
                🤖 Chat with AI Assistant
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Did You Know Section */}
      <section
        className={`relative z-10 px-8 lg:px-16 py-20 ${
          theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🤔 Did You Know?
            </motion.h2>
            <motion.p className="text-xl font-medium text-gray-600 dark:text-gray-300">
              AI is revolutionizing how students learn and grow! 🚀
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: AI Explanation */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="inline-block text-4xl mb-6"
                >
                  🧠
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  How AI Transforms Student Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Artificial Intelligence is like having a super-smart study buddy that never gets
                  tired! It analyzes your learning patterns, identifies your strengths and
                  weaknesses, and creates a personalized roadmap to help you succeed.
                </p>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    💡 Fun Fact: AI can help you learn 40% faster by focusing on areas where you
                    need the most help!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: AI Benefits Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  AI Learning Superpowers
                </h3>
                <div className="grid gap-3">
                  {aiBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        transition: {
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                          {benefit.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated Learning Stats Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">Ready to Start?</h4>
                    <p className="text-green-100 text-sm">
                      Join thousands of students already learning smarter!
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-4xl"
                  >
                    🎓
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
