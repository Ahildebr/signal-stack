import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function ViewsChart({ data }) {
  const formattedData = [...data]
    .sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt))
    .map((post) => ({
      name: new Date(post.postedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      views: post.views,
    }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-inner h-96">
      <h2 className="text-xl font-bold text-white mb-4">Views Over Time</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
          <Line type="monotone" dataKey="views" stroke="#38bdf8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewsChart;
