import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const LineCharts = ({
  data = [],
  dataKey = "balance",             // Y-axis key
  xKey = "transactionDate",        // X-axis key
  xLabel = "Date",                 // X-axis label
  yLabel = "Value",                // Y-axis label
  lineName = "Line",              // Legend name
  stroke = "#10b981",              // Line color
}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis
          dataKey={xKey}
          label={{
            value: xLabel,
            position: "insideBottom",
            offset: -5,
            style: { textAnchor: "middle" },
          }}
        />
        <YAxis
          label={{
            value: yLabel,
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
          strokeWidth={2}
          name={lineName}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
