import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ dark, setDark }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark(!dark)}
      className="
        relative flex items-center gap-2 
        px-4 py-2 rounded-full 
        bg-white/50 dark:bg-gray-800/50 
        backdrop-blur-xl shadow-lg 
        border border-white/20 dark:border-white/10
        transition-all duration-300
      "
    >
      {/* Sliding Thumb */}
      <motion.div
        animate={{ x: dark ? 36 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="
          absolute left-1 top-1 w-7 h-7 rounded-full 
          bg-gradient-to-r from-purple-500 to-indigo-500 
          shadow-md
        "
      />

      {/* ICONS */}
      <FiSun
        className={`
          text-xl transition 
          ${dark ? "text-gray-400" : "text-yellow-400"}
        `}
      />
      <FiMoon
        className={`
          text-xl transition 
          ${dark ? "text-blue-300" : "text-gray-500"}
        `}
      />

      {/* LABEL */}
      <span className="ml-8 text-sm font-medium text-gray-900 dark:text-white">
        {dark ? "Dark Mode" : "Light Mode"}
      </span>
    </motion.button>
  );
}
