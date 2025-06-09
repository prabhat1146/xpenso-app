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
} from "recharts";
import Alert from "../components/Alert";

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

const Home = () => {
  const totalIncome = incomeExpenseData.reduce((acc, cur) => acc + cur.income, 0);
  const totalExpense = incomeExpenseData.reduce((acc, cur) => acc + cur.expense, 0);
  const savings = totalIncome - totalExpense;

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
        {/* Bar Chart: Monthly Expense */}
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

        {/* Pie Chart: Category-wise Spending */}
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

      {/* Area Chart: Income vs Expense */}
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00C49F"
              fillOpacity={1}
              fill="url(#income)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#FF8042"
              fillOpacity={1}
              fill="url(#expense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
       {/* <Alert message={"message"}/> */}
    </div>
  );
};

export default Home;
