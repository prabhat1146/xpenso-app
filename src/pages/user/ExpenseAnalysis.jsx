import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0"];

const ExpenseAnalysis = ({ expenses }) => {
  // Calculate total expenses per category
  const data = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {})
  ).map(([category, amount]) => ({ name: category, value: amount }));

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Expense Analysis</h2>

      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Pie Chart */}
        <div className="md:w-1/2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Table */}
        <div className="md:w-1/2 mt-6 md:mt-0 overflow-auto">
          <table className="w-full border-collapse border border-gray-200 text-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount ($)</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Percent (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, value }, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{value.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {((value / total) * 100).toFixed(1)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">Total</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{total.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalysis;
