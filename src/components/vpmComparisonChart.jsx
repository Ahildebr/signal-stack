import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function getAveragesByVPN(posts) {
  const vpnOn = posts.filter(post => post.vpn === 'on');
  const vpnOff = posts.filter(post => post.vpn === 'off');

  function avg(arr, key) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, post) => sum + post[key], 0) / arr.length;
  }

  return [
    {
      metric: 'Views',
      vpn_on: Math.round(avg(vpnOn, 'views')),
      vpn_off: Math.round(avg(vpnOff, 'views')),
    },
    {
      metric: 'Likes',
      vpn_on: Math.round(avg(vpnOn, 'likes')),
      vpn_off: Math.round(avg(vpnOff, 'likes')),
    },
    {
      metric: 'Shares',
      vpn_on: Math.round(avg(vpnOn, 'shares')),
      vpn_off: Math.round(avg(vpnOff, 'shares')),
    },
  ];
}

function VpnComparisonChart({ posts }) {
  const data = getAveragesByVPN(posts);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-inner h-96">
      <h2 className="text-xl font-bold text-white mb-4">VPN On vs Off Performance</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="metric" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
          <Bar dataKey="vpn_on" fill="#ef4444" name="VPN On" />
          <Bar dataKey="vpn_off" fill="#22c55e" name="VPN Off" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VpnComparisonChart;
