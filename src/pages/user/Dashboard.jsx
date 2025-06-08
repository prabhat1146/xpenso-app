import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Welcome back 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold text-cyan-500">₹12,500</p>
          <p className="text-sm text-slate-500 mt-1">This month</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Budget Remaining</h2>
          <p className="text-2xl font-bold text-emerald-500">₹7,500</p>
          <p className="text-sm text-slate-500 mt-1">Out of ₹20,000</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Recent Transactions</h2>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Grocery - ₹1,200</li>
            <li>Electricity - ₹800</li>
            <li>Dining - ₹650</li>
          </ul>
        </div>
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Spending Overview</h2>
        <div className="text-slate-500 text-sm">
          {/* Integrate chart.js or recharts here */}
          [Chart goes here...]
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
