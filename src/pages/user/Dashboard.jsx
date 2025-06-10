import React, { useEffect, useState } from "react";
import UseGetTransactionsData from "../../hooks/useGetTransactionsData";
import FullScreenLoader from "../../components/FullScreenLoader";
import UseGetTransactions from "../../hooks/useGetTransactions";
import { formateStringView } from "../../utils/functions/funUtils";
import BarCharts from "../../components/charts/BarCharts";

const Dashboard = () => {
  const { totalIncome, totalExpense, totalTransfer, totalBalance } =
    UseGetTransactionsData();
  const { transactions } = UseGetTransactions();
  const [transLength, setTransLength] = useState(transactions?.length);

  useEffect(() => {
    setTransLength(transactions?.length);
    console.log(transactions);
  }, [transactions]);

  if (!transactions) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Welcome back 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Total Balance
          </h2>
          <p className="text-2xl font-bold text-green-600">₹{totalBalance}</p>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Total Income
          </h2>
          <p className="text-2xl font-bold text-cyan-500">₹{totalIncome}</p>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Total Expenses
          </h2>
          <p className="text-2xl font-bold text-red-600">₹{totalExpense}</p>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Total Transfer
          </h2>
          <p className="text-2xl font-bold text-orange-600">₹{totalTransfer}</p>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">
            Recent Transactions
          </h2>
          <ul className="text-sm text-slate-600 space-y-1">
            {transactions &&
              [...transactions]
                .reverse()
                .slice(0, 5)
                .map((t, ind) => (
                  <li key={ind}>
                    {formateStringView(t?.category?.type)} | {t?.category?.name}{" "}
                    - ₹{t?.amount}
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Spending Overview
        </h2>
        <div className="text-slate-500 text-sm">
          <BarCharts />
        </div>
      </div>
      {transactions?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          {/* Optional: Add an icon for visual feedback */}
          {/* <FileText className="w-10 h-10 mb-3 text-gray-300" /> */}
          <div className="text-lg font-semibold mb-1">
            No transactions found
          </div>
          <div className="text-sm text-gray-400">
            Your recent transactions will appear here once added.
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
