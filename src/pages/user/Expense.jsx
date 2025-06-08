import React, { useState } from "react";

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
];

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.category) {
      setError("Please select a category.");
      return;
    }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
    };

    setExpenses([newExpense, ...expenses]);
    setForm({ category: "", amount: "", date: "" });
  };

  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Expenses</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleAddExpense} className="mb-8 space-y-4">
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white font-semibold py-3 rounded-md hover:bg-cyan-600 transition"
        >
          Add Expense
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-cyan-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount ($)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(({ id, category, amount, date }) => (
                <tr key={id} className="hover:bg-cyan-50">
                  <td className="border border-gray-300 px-4 py-2">{category}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{date}</td>
                </tr>
              ))}
              <tr className="font-bold bg-cyan-100">
                <td className="border border-gray-300 px-4 py-2">Total</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{totalExpense.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expense;
