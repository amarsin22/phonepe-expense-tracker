import { Pie, Bar, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Charts({ expenses }) {
  const [isDark, setIsDark] = useState(false);

  // Detect theme automatically
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const textColor = isDark ? "#e5e7eb" : "#1f2937";

  // CATEGORY TOTALS
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "rgba(99,102,241,0.9)", // Indigo
          "rgba(139,92,246,0.9)", // Purple
          "rgba(16,185,129,0.9)", // Green
          "rgba(234,88,12,0.9)",  // Orange
          "rgba(236,72,153,0.9)", // Pink
          "rgba(249,115,22,0.9)", // Amber
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { animateScale: true, animateRotate: true, duration: 900 },
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: textColor, padding: 12 },
      },
    },
  };

  // MONTHLY LINE CHART
  const monthly = {};
  expenses.forEach((e) => {
    const m = e.date ? e.date.slice(0, 7) : "Unknown"; // YYYY-MM
    monthly[m] = (monthly[m] || 0) + e.amount;
  });

  const months = Object.keys(monthly).sort();

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Trend",
        data: months.map((m) => monthly[m]),
        fill: true,
        backgroundColor: "rgba(99,102,241,0.15)",
        borderColor: "rgba(99,102,241,1)",
        tension: 0.35,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000 },
    scales: {
      x: { ticks: { color: textColor } },
      y: { ticks: { color: textColor } },
    },
    plugins: {
      legend: {
        labels: { color: textColor },
      },
    },
  };

  // BAR CHART
  const barData = {
    labels: months,
    datasets: [
      {
        label: "Amount",
        data: months.map((m) => monthly[m]),
        backgroundColor: "rgba(139,92,246,0.85)",
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1100 },
    scales: {
      x: { ticks: { color: textColor } },
      y: { ticks: { color: textColor } },
    },
    plugins: {
      legend: {
        labels: { color: textColor },
      },
    },
  };

  // CARD STYLE (glassmorphic)
  const glassCard =
    "bg-white/50 dark:bg-gray-800/40 backdrop-blur-xl p-5 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${glassCard} h-80`}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Category Breakdown</h3>
        <div className="h-60">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${glassCard} md:col-span-2 h-80`}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Expense Trends</h3>
        <div className="h-60">
          <Line data={lineData} options={lineOptions} />
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${glassCard} md:col-span-3 h-80`}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Monthly Bar Chart</h3>
        <div className="h-60">
          <Bar data={barData} options={barOptions} />
        </div>
      </motion.div>

    </div>
  );
}
