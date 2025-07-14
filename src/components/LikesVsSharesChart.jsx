import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

function LikesVsSharesChart({ posts }) {
  const data = posts.map(post => ({
    likes: post.likes,
    shares: post.shares,
    title: post.title,
  }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-white text-lg font-bold mb-2">Likes vs Shares</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="likes" name="Likes">
            <Label value="Likes" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis type="number" dataKey="shares" name="Shares">
            <Label value="Shares" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { likes, shares, title } = payload[0].payload;
              return (
                <div className="bg-gray-900 text-white p-2 rounded">
                  <p className="font-bold">{title}</p>
                  <p>Likes: {likes}</p>
                  <p>Shares: {shares}</p>
                </div>
              );
            }
            return null;
          }} />
          <Scatter name="Post" data={data} fill="#38bdf8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LikesVsSharesChart;
