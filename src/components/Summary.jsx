import { motion } from "framer-motion";
import { FiArrowUpCircle, FiArrowDownCircle, FiTrendingUp } from "react-icons/fi";

export default function Summary({ expenses }) {
  const income = expenses
    .filter(e => e.type === "Income")
    .reduce((s, e) => s + e.amount, 0);

  const expense = expenses
    .filter(e => e.type === "Expense")
    .reduce((s, e) => s + e.amount, 0);

  const balance = income - expense;

  const cardStyle =
    "p-6 rounded-3xl shadow-xl border border-white/20 dark:border-white/10 " +
    "backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 " + 
    "transition-all duration-300";

  const labelText = "text-sm text-gray-700 dark:text-gray-300";
  const valueText = "text-3xl font-bold text-gray-900 dark:text-white";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

      {/* Income Card */}
      <motion.div whileHover={{ scale: 1.04 }} className={`${cardStyle} bg-gradient-to-br from-green-400/20 to-green-600/10`}>
        <div className="flex items-center gap-4">
          <FiArrowUpCircle className="text-4xl text-green-400 drop-shadow-lg" />
          <div>
            <p className={labelText}>Total Income</p>
            <p className={valueText}>₹{income}</p>
          </div>
        </div>
      </motion.div>

      {/* Expense Card */}
      <motion.div whileHover={{ scale: 1.04 }} className={`${cardStyle} bg-gradient-to-br from-pink-400/20 to-pink-600/10`}>
        <div className="flex items-center gap-4">
          <FiArrowDownCircle className="text-4xl text-pink-400 drop-shadow-lg" />
          <div>
            <p className={labelText}>Total Expense</p>
            <p className={valueText}>₹{expense}</p>
          </div>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div whileHover={{ scale: 1.04 }} className={`${cardStyle} bg-gradient-to-br from-purple-500/20 to-indigo-500/10`}>
        <div className="flex items-center gap-4">
          <FiTrendingUp className="text-4xl text-yellow-300 drop-shadow-lg" />
          <div>
            <p className={labelText}>Balance</p>
            <p className={valueText}>₹{balance}</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
