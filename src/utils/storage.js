export const loadExpenses = () => {
  try {
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  } catch {}
};
