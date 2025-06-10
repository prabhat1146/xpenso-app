import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const monthlyData = [
  { month: "Jan", income: 4000, expense: 2500 },
  { month: "Feb", income: 4200, expense: 3000 },
  { month: "Mar", income: 3500, expense: 2800 },
  { month: "Apr", income: 5000, expense: 3200 },
  { month: "May", income: 4800, expense: 3300 },
  { month: "Jun", income: 5200, expense: 3100 },
];
const BarCharts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={monthlyData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#60a5fa" name="Income" />
        <Bar dataKey="expense" fill="#f87171" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
