import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, deleteExpense, setEditing }) {
  if (!expenses || expenses.length === 0) {
    return <p className="text-center text-gray-300">No transactions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {expenses.map((it) => (
        <ExpenseItem key={it.id} item={it} deleteExpense={deleteExpense} setEditing={setEditing} />
      ))}
    </div>
  );
}
