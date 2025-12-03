import { motion } from "framer-motion";

const icons = {
  Food: "🍔",
  Travel: "🚕",
  Shopping: "🛍️",
  Bills: "💡",
  Salary: "💰",
  Investment: "📈",
  Other: "📦",
};

export default function ExpenseItem({ item, deleteExpense, setEditing }) {
  const isIncome = item.type === "Income";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="
        flex justify-between items-center gap-4 p-4 
        bg-white/60 dark:bg-gray-800/40
        backdrop-blur-xl rounded-2xl shadow-xl 
        border border-white/20 dark:border-white/10
        transition-all
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Icon Badge */}
        <div
          className="
            w-12 h-12 rounded-2xl flex items-center justify-center 
            text-xl font-bold shadow-md
            bg-gradient-to-br from-purple-600 to-indigo-600 text-white
          "
        >
          {icons[item.category] || "📦"}
        </div>

        {/* Text Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.category} • {item.date}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Amount */}
        <p
          className={`font-bold text-lg ${
            isIncome ? "text-green-500" : "text-pink-400"
          }`}
        >
          ₹{item.amount}
        </p>

        {/* Edit Button */}
        <button
          onClick={() => setEditing(item)}
          className="
            px-4 py-1.5 rounded-xl text-sm font-medium
            bg-gray-200 dark:bg-white/10 
            text-gray-900 dark:text-white 
            hover:bg-gray-300 dark:hover:bg-white/20 
            transition
          "
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteExpense(item.id)}
          className="
            text-red-500 text-2xl leading-none 
            hover:text-red-600 transition
          "
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
