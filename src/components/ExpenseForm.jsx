import { useState, useEffect } from "react";
import { predictCategory } from "../utils/aiCategorizer";
import { motion } from "framer-motion";

export default function ExpenseForm({ addExpense, editing, setEditing }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(editing.amount);
      setType(editing.type);
      setDate(editing.date);
    }
  }, [editing]);

  const inputStyle =
    "w-full border border-gray-300 dark:border-gray-600 p-3 rounded-xl " +
    "bg-white dark:bg-gray-800 text-gray-900 dark:text-white " +
    "placeholder-gray-500 dark:placeholder-gray-400 " +
    "focus:ring-2 focus:ring-purple-400 outline-none transition";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return alert("Please fill all fields");

    const category = predictCategory(title);

    const data = {
      id: editing ? editing.id : Date.now(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    addExpense(data);
    setEditing(null);
    setTitle("");
    setAmount("");
    setType("Expense");
    setDate("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        max-w-xl mx-auto p-6 
        bg-white/60 dark:bg-gray-900/40 
        backdrop-blur-xl rounded-3xl 
        border border-white/20 dark:border-white/10 
        shadow-2xl flex flex-col gap-5
      "
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {editing ? "Edit Transaction" : "Add Transaction"}
      </h2>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <input
          className={inputStyle}
          placeholder="Title (e.g., Swiggy order)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {title && (
          <p className="text-sm text-purple-700 dark:text-purple-300">
            AI Prediction: <strong>{predictCategory(title)}</strong>
          </p>
        )}
      </div>

      {/* Amount + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className={inputStyle}
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className={inputStyle}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Expense</option>
          <option>Income</option>
        </select>
      </div>

      {/* Date */}
      <input
        className={inputStyle}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          className="
            bg-gradient-to-r from-purple-600 to-indigo-600 
            text-white px-6 py-3 rounded-2xl 
            shadow-xl hover:scale-105 transition-all
          "
        >
          {editing ? "Update" : "Add"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="
              px-6 py-3 rounded-2xl 
              bg-gray-200 dark:bg-white/10 
              text-gray-900 dark:text-white
            "
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
}
