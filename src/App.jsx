import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import Charts from "./components/Charts";
import ThemeToggle from "./components/ThemeToggle";
import { loadExpenses, saveExpenses } from "./utils/storage";
import { motion } from "framer-motion";
import "./chartSetup";
import "./index.css";

export default function App() {
  const [expenses, setExpenses] = useState(loadExpenses());
  const [editing, setEditing] = useState(null);
  const [dark, setDark] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => saveExpenses(expenses), [expenses]);

  const addExpense = (expense) => {
    if (editing) {
      setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
    } else {
      setExpenses([expense, ...expenses]);
    }
  };

  const deleteExpense = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));

  return (
    <div className={dark ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar
          setActivePage={setActivePage}
          activePage={activePage}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* MAIN AREA */}
        <div className="flex-1 md:ml-64 px-3 sm:px-6 md:px-10 py-4 w-full transition-all">

          {/* HEADER FIXED RESPONSIVE */}
          <div
            className="
              flex flex-col sm:flex-row 
              sm:items-center sm:justify-between 
              gap-4 mb-6 w-full
            "
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-3 w-full sm:w-auto">

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-2xl text-white"
              >
                ☰
              </button>

              {/* TITLE CARD (NOW FULLY RESPONSIVE) */}
              <div
                className="
                  bg-gradient-to-r from-purple-600 to-indigo-600 
                  rounded-3xl p-4 shadow-xl flex-1 sm:flex-none
                "
              >
                <h1 className="text-white text-lg sm:text-xl font-bold">
                  PhonePe-style Dashboard
                </h1>
                <p className="text-purple-100 text-sm opacity-90">
                  Smart spending & insights
                </p>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3 flex-wrap">
              <button className="hidden sm:inline-block bg-white/10 text-white px-4 py-2 rounded-xl backdrop-blur">
                Quick Pay
              </button>
              <ThemeToggle dark={dark} setDark={setDark} />
            </div>
          </div>

          {/* PAGE CONTENT */}
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            {activePage === "dashboard" && (
              <>
                <Summary expenses={expenses} />

                {/* MAIN GRID */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* CHARTS */}
                  <div className="lg:col-span-2">
                    <Charts expenses={expenses} />
                  </div>

                  {/* RIGHT CARD */}
                  <div className="lg:col-span-1">
                    <div className="bg-white/10 dark:bg-gray-800/40 backdrop-blur rounded-2xl p-4 shadow-xl border border-white/10">

                      <h3 className="text-white font-semibold mb-4">Quick Actions</h3>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setActivePage("add")}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-2xl shadow"
                        >
                          + Add Expense
                        </button>

                        <button
                          onClick={() => setActivePage("add")}
                          className="bg-gradient-to-r from-teal-400 to-emerald-400 text-white p-3 rounded-2xl shadow"
                        >
                          + Add Income
                        </button>
                      </div>

                      {/* RECENT LIST */}
                      <div className="mt-6">
                        <h4 className="text-white font-semibold mb-3">Recent</h4>

                        <div className="flex flex-col gap-3">
                          {expenses.slice(0, 4).map((t) => (
                            <div
                              key={t.id}
                              className="flex items-center justify-between bg-white/10 p-3 rounded-xl"
                            >
                              <div>
                                <p className="text-white font-medium">{t.title}</p>
                                <p className="text-sm text-gray-300">{t.date}</p>
                              </div>

                              <p
                                className={`font-bold ${
                                  t.type === "Income" ? "text-green-300" : "text-pink-300"
                                }`}
                              >
                                ₹{t.amount}
                              </p>
                            </div>
                          ))}

                          {expenses.length === 0 && (
                            <p className="text-gray-300">No transactions yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activePage === "add" && (
              <ExpenseForm
                addExpense={addExpense}
                editing={editing}
                setEditing={setEditing}
              />
            )}

            {activePage === "list" && (
              <ExpenseList
                expenses={expenses}
                deleteExpense={deleteExpense}
                setEditing={setEditing}
              />
            )}

            {activePage === "charts" && <Charts expenses={expenses} />}
          </motion.div>

          {/* FLOATING ADD BUTTON */}
          <button
            onClick={() => setActivePage("add")}
            className="
              fixed bottom-20 right-6 w-16 h-16 
              bg-gradient-to-r from-purple-600 to-indigo-600 
              text-white text-3xl rounded-full shadow-2xl 
              flex items-center justify-center md:hidden
            "
          >
            +
          </button>

          {/* MOBILE BOTTOM NAV */}
          <div
            className="
              md:hidden fixed bottom-0 left-0 w-full 
              bg-white/10 backdrop-blur border-t border-white/10 
              flex justify-around py-2 text-xl text-white
            "
          >
            <button onClick={() => setActivePage("dashboard")}>🏠</button>
            <button onClick={() => setActivePage("charts")}>📊</button>
            <button onClick={() => setActivePage("add")}>➕</button>
            <button onClick={() => setActivePage("list")}>📄</button>
          </div>

        </div>
      </div>
    </div>
  );
}
