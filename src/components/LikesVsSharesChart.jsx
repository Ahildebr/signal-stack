import React from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Label
} from "recharts";







function LikesVsSharesChart({ posts }) {
  const data = posts.map(post => ({
    likes: post.likes,
    shares: post.shares,
    title: post.title,
  }));

  return (
    <div className="bg-gray-700 p-4 rounded-xl shadow-md">
      <h2 className="text-white text-lg font-bold mb-2">Likes vs Shares</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#faf7f7" />
          <XAxis type="number" dataKey="likes" name="Likes" stroke="#E5E7EB">
            <Label value="Likes" offset={-5} position="insideBottom" stroke="#E5E7EB" />
          </XAxis>
          <YAxis type="number" dataKey="shares" name="Shares" stroke="#E5E7EB">
            <Label value="Shares" angle={-90} position="insideLeft" stroke="#E5E7EB" />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload?.length) {
                const { likes, shares, title } = payload[0].payload;
                return (
                  <div className="bg-gray-800 text-white p-2 rounded shadow">
                    <p className="font-bold text-pink-500">{title}</p>
                    <p>Likes: {likes}</p>
                    <p>Shares: {shares}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Post" data={data} fill="#38bdf8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LikesVsSharesChart;

