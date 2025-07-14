import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import moment from "moment";

function ViewsChart({ data }) {
  // Convert post data into date → views mapping
  const chartData = data.map(post => ({
    date: moment(post.posted_at).format("MMM D"), // e.g., "Jul 14"
    views: post.views,
  })).sort((a, b) => new Date(a.date) - new Date(b.date)); // optional: sort by date

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
      <h2 className="text-white text-lg font-bold mb-2">Views Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="date" stroke="#E5E7EB" />
          <YAxis stroke="#E5E7EB" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px" }}
            labelStyle={{ color: "#F9FAFB" }}
            itemStyle={{ color: "#FCD34D" }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewsChart;
