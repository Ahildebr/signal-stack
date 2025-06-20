import React from "react";

function PostsTable({ posts }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-inner overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-sm uppercase text-gray-400 border-b border-gray-700">
            <th className="py-2 pr-4">Title</th>
            <th className="py-2 pr-4">Views</th>
            <th className="py-2 pr-4">Likes</th>
            <th className="py-2 pr-4">Shares</th>
            <th className="py-2 pr-4">Follows</th>
            <th className="py-2 pr-4">Posted At</th>
            <th className="py-2 pr-4">VPN</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-700 text-sm hover:bg-gray-700/40">
              <td className="py-2 pr-4">{post.title}</td>
              <td className="py-2 pr-4">{post.views.toLocaleString()}</td>
              <td className="py-2 pr-4">{post.likes}</td>
              <td className="py-2 pr-4">{post.shares}</td>
              <td className="py-2 pr-4">{post.followers}</td>
              <td className="py-2 pr-4">{post.postedAt}</td>
              <td className="py-2 pr-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    post.vpn === 'on' ? 'bg-red-600' : 'bg-green-600'
                  } text-white`}
                >
                  {post.vpn}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsTable;
