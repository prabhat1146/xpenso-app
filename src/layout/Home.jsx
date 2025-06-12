import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const expenseData = [
  { month: "Jan", expense: 1200 },
  { month: "Feb", expense: 980 },
  { month: "Mar", expense: 1450 },
  { month: "Apr", expense: 1100 },
  { month: "May", expense: 1650 },
  { month: "Jun", expense: 1300 },
];

const categoryData = [
  { name: "Food", value: 450 },
  { name: "Travel", value: 300 },
  { name: "Shopping", value: 200 },
  { name: "Utilities", value: 350 },
  { name: "Other", value: 400 },
];

const incomeExpenseData = [
  { month: "Jan", income: 2000, expense: 1200 },
  { month: "Feb", income: 2100, expense: 980 },
  { month: "Mar", income: 2200, expense: 1450 },
  { month: "Apr", income: 2000, expense: 1100 },
  { month: "May", income: 2500, expense: 1650 },
  { month: "Jun", income: 2300, expense: 1300 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const transactions = [
  { id: 1, date: "2025-06-01", category: "Food", amount: 150, type: "Expense" },
  { id: 2, date: "2025-06-02", category: "Salary", amount: 2000, type: "Income" },
  { id: 3, date: "2025-06-03", category: "Travel", amount: 300, type: "Expense" },
  { id: 4, date: "2025-06-04", category: "Freelance", amount: 500, type: "Income" },
];

const Home = () => {
  const totalIncome = incomeExpenseData.reduce((acc, cur) => acc + cur.income, 0);
  const totalExpense = incomeExpenseData.reduce((acc, cur) => acc + cur.expense, 0);
  const savings = totalIncome - totalExpense;

  const balanceData = incomeExpenseData.map((item) => ({
    month: item.month,
    balance: item.income - item.expense,
  }));

  const savingsTrendData = incomeExpenseData.map((item, index) => {
    const previous = index === 0 ? 0 : incomeExpenseData[index - 1].income - incomeExpenseData[index - 1].expense;
    return {
      month: item.month,
      savings: item.income - item.expense + previous,
    };
  });

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-800">Total Income</h2>
          <p className="text-2xl mt-2 font-bold text-green-900">₹{totalIncome}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-red-800">Total Expense</h2>
          <p className="text-2xl mt-2 font-bold text-red-900">₹{totalExpense}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-800">Net Savings</h2>
          <p className="text-2xl mt-2 font-bold text-blue-900">₹{savings}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Expense */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={incomeExpenseData}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF8042" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="income" stroke="#00C49F" fill="url(#income)" />
            <Area type="monotone" dataKey="expense" stroke="#FF8042" fill="url(#expense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Balance Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Balance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={balanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="balance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Trend Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Savings Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={savingsTrendData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="savings" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Categories Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Top Spending Categories</h2>
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead>
            <tr>
              <th className="py-2">Category</th>
              <th className="py-2">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Category</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="py-2">{tx.date}</td>
                <td className="py-2">{tx.category}</td>
                <td className="py-2">₹{tx.amount}</td>
                <td className={`py-2 ${tx.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                  {tx.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
