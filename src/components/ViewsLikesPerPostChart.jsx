import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ViewsLikesPerPostChart({ posts }) {
  const data = posts.map(post => ({
    title: post.title.length > 20 ? post.title.slice(0, 20) + "…" : post.title,
    views: post.views,
    likes: post.likes,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white text-lg font-bold mb-2">Views & Likes by Post</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" angle={-30} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#facc15" name="Views" />
          <Bar dataKey="likes" fill="#fb7185" name="Likes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewsLikesPerPostChart;
