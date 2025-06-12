import React from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import UseGetTransactionsData from "../../hooks/useGetTransactionsData";
import FullScreenLoader from "../../components/FullScreenLoader";
import BarCharts from "../../components/charts/BarCharts";
import LineCharts from "../../components/charts/LineCharts";
import PieCharts from "../../components/charts/PieCharts";
import {
  filterCategoryByTimeRange,
  groupByExpenseCategory,
} from "../../utils/functions/funUtils";
import UseGetTransactions from "../../hooks/useGetTransactions";

const monthlyData = [
  { month: "Jan", income: 4000, expense: 2500 },
  { month: "Feb", income: 4200, expense: 3000 },
  { month: "Mar", income: 3500, expense: 2800 },
  { month: "Apr", income: 5000, expense: 3200 },
  { month: "May", income: 4800, expense: 3300 },
  { month: "Jun", income: 5200, expense: 3100 },
];

const categoryExpenseData = [
  { name: "Food & Groceries", value: 4000, color: "#f87171" },
  { name: "Rent", value: 2500, color: "#60a5fa" },
  { name: "Utilities", value: 1500, color: "#34d399" },
  { name: "Transportation", value: 1200, color: "#fbbf24" },
  { name: "Entertainment", value: 800, color: "#a78bfa" },
];

// const incomeData = monthlyData.map((item) => item.income);
// const expenseData = monthlyData.map((item) => item.expense);
const balanceData = monthlyData.map((item) => item.income - item.expense);
// const totalIncome = incomeData.reduce((a, b) => a + b, 0);
// const totalExpense = expenseData.reduce((a, b) => a + b, 0);
// const totalBalance = totalIncome - totalExpense;

export default function ExpenseAnalysis() {
  const {
    perDayTrans,
    totalIncome,
    totalExpense,
    totalTransfer,
    totalBalance,
    perMonthTrans,
  } = UseGetTransactionsData();

  const { transactions } = UseGetTransactions();

  if (
    (!totalBalance && totalBalance !== 0) ||
    (!totalIncome && totalIncome !== 0) ||
    (!totalExpense && totalExpense !== 0) ||
    (!totalTransfer && totalTransfer !== 0)
  ) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {/* Expense Analysis */}
      </h1>

      {/* Summary Cards with Lucide Icons */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex-1 bg-white rounded-lg p-4 shadow flex items-center gap-3">
          <Wallet className="w-8 h-8 text-green-500" />
          <div>
            <div className="text-gray-500 text-xs font-semibold">
              Total Balance
            </div>
            <div className="mt-2 text-lg font-bold text-green-600">
              ₹{totalBalance.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4 shadow flex items-center gap-3">
          <ArrowDownCircle className="w-8 h-8 text-blue-500" />
          <div>
            <div className="text-gray-500 text-xs font-semibold">
              Total Income
            </div>
            <div className="mt-2 text-lg font-bold text-blue-600">
              ₹{totalIncome.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4 shadow flex items-center gap-3">
          <ArrowUpCircle className="w-8 h-8 text-red-500" />
          <div>
            <div className="text-gray-500 text-xs font-semibold">
              Total Expense
            </div>
            <div className="mt-2 text-lg font-bold text-red-600">
              ₹{totalExpense.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4 shadow flex items-center gap-3">
          <ArrowUpCircle className="w-8 h-8 text-red-500" />
          <div>
            <div className="text-gray-500 text-xs font-semibold">
              Total Transfer
            </div>
            <div className="mt-2 text-lg font-bold text-red-600">
              ₹{totalTransfer.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}

      {transactions === null || transactions.length === 0 ? (
        <>
          <div className="text-center text-gray-400 py-8">
            No transactions found.
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Income vs Expense
              </div>
              <div>
                <BarCharts dataKey="monthName" data={perMonthTrans} />
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-4">
                Balance Trend
              </div>
              <div>
                <LineCharts
                  data={perDayTrans}
                  dataKey="balance"
                  xKey="date"
                  xLabel="Date"
                  yLabel="Amount (₹)"
                  lineName="Daily Expenses"
                  stroke="#f87171"
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-4">
                Expense by Category
              </div>
              {/* <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryExpenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              label
            >
              {categoryExpenseData.map((entry, idx) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer> */}

              <div>
                {transactions?.length > 0 && (
                  <PieCharts
                    data={groupByExpenseCategory(
                      filterCategoryByTimeRange(transactions)
                    )}
                  />
                )}
              </div>
            </div>
            {/* <div className="mt-4">
          {categoryExpenseData.map(({ name, color, value }) => (
            <div key={name} className="flex items-center mb-2">
              <span
                className="w-4 h-4 rounded-sm mr-3 inline-block"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-700 text-sm">
                {name}: ₹{value.toLocaleString()}
              </span>
            </div>
          ))}
        </div> */}
          </div>
        </>
      )}
    </div>
  );
}
