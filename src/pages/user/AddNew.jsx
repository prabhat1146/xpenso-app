import React, { useState } from "react";

const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
];

const AddNew = ({ onAdd }) => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
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

    // Call onAdd prop with new data
    onAdd({
      id: Date.now(),
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
    });

    // Clear form
    setForm({
      category: "",
      amount: "",
      date: "",
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Expense</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white font-semibold py-3 rounded-md hover:bg-cyan-600 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddNew;
