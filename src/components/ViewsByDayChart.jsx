import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ViewsByDayChart({ posts }) {
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const viewsByDay = {};

  posts.forEach(post => {
    const day = dayMap[new Date(post.posted_at).getDay()];
    viewsByDay[day] = (viewsByDay[day] || 0) + post.views;
  });

  const data = dayMap.map(day => ({ day, views: viewsByDay[day] || 0 }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white text-lg font-bold mb-2">Views by Day of Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewsByDayChart;
