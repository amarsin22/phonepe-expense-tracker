import { motion } from "framer-motion";
import { FiPieChart, FiList, FiPlusCircle, FiHome, FiX } from "react-icons/fi";

export default function Sidebar({ setActivePage, activePage, mobileOpen, setMobileOpen }) {
  const items = [
    { name: "Home", icon: <FiHome />, page: "dashboard" },
    { name: "Add", icon: <FiPlusCircle />, page: "add" },
    { name: "Expenses", icon: <FiList />, page: "list" },
    { name: "Analytics", icon: <FiPieChart />, page: "charts" },
  ];

  const getButtonClass = (page) =>
    page === activePage
      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
      : "bg-gray-100/60 dark:bg-gray-800/50 text-gray-800 dark:text-white hover:bg-gray-200/60 dark:hover:bg-gray-700/60";

  const getMobileButtonClass = (page) =>
    page === activePage
      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
      : "bg-gray-100 dark:bg-gray-800/70 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div
        className="
          hidden md:flex w-64 h-screen fixed left-0 top-0
          bg-white/70 dark:bg-gray-900/70 
          backdrop-blur-xl shadow-2xl 
          rounded-r-3xl p-6 flex-col gap-6
          border-r border-white/20 dark:border-gray-700
          z-40
        "
      >
        <h1 className="text-2xl font-bold dark:text-white text-gray-800 select-none">
          💜 PhonePe
        </h1>

        <div className="flex flex-col gap-3 mt-6">
          {items.map((it) => (
            <motion.button
              key={it.page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePage(it.page)}
              className={`flex items-center gap-3 p-3 rounded-xl text-lg transition-all duration-200 ${getButtonClass(
                it.page
              )}`}
            >
              {it.icon}
              {it.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* MOBILE SIDEBAR / DRAWER */}
      {mobileOpen && (
        <motion.div
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          exit={{ x: -260 }}
          transition={{ duration: 0.25 }}
          className="
            md:hidden fixed top-0 left-0 w-64 h-full 
            bg-white dark:bg-gray-900 shadow-2xl
            p-6 z-50 border-r dark:border-gray-700
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">
              💜 PhonePe
            </h1>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-3xl text-gray-700 dark:text-white"
            >
              <FiX />
            </button>
          </div>

          {/* Nav Buttons */}
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <motion.button
                key={it.page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActivePage(it.page);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl text-lg transition-all duration-200 ${getMobileButtonClass(
                  it.page
                )}`}
              >
                {it.icon}
                {it.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
