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


const XAxisLabel={
      value: "Month",
      position: "insideBottom",
      offset: -5,
      style: { textAnchor: 'middle' }
    }
const YAxisLabel={
      value: "Amount (₹)",
      angle: -90,
      position: "insideLeft",
      style: { textAnchor: 'middle' },
    }

const data= [
  { monthName: "Jan", income: 4000, expense: 2500 },
  { monthName: "Feb", income: 4200, expense: 3000 },
  { monthName: "Mar", income: 3500, expense: 2800 },
  { monthName: "Apr", income: 5000, expense: 3200 },
  { monthName: "May", income: 4800, expense: 3300 },
  { monthName: "Jun", income: 5200, expense: 3100 },
];

const BarCharts = ({ data,dataKey="Day" }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis label={YAxisLabel} />
        <Tooltip />
        <Legend  />
        <XAxis dataKey="month Name" label={XAxisLabel}/>
        <Bar dataKey="income" fill="#60a5fa" name="Income" />
        <Bar dataKey="expense" fill="#f87171" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
