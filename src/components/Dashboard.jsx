import React from "react";
import { useState } from "react";
import PostsTable from "./PostsTable";
//import mockPosts from "../data/mockPosts";
import OverviewCard from "./OverviewCard";
import NewPostForm from "./NewPostForm";
import VpnComparisonChart from "./vpmComparisonChart";
import ViewsChart from "./ViewsChart";





function Dashboard() {
  const [posts, setPosts] = useState([]);

  const totals = posts.reduce(
    (acc, post) => {
      acc.views += post.views;
      acc.likes += post.likes;
      acc.shares += post.shares;
      acc.followers += post.followers;
      return acc;
    },
    { views: 0, likes: 0, shares: 0, followers: 0 }
  );

  function handleAddPost(newPost) {
    setPosts([newPost, ...posts]);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📊 SignalStack Dashboard</h1>

      <NewPostForm onAddPost={handleAddPost} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard label="Views" value={totals.views.toLocaleString()} />
        <OverviewCard label="Likes" value={totals.likes.toLocaleString()} />
        <OverviewCard label="Shares" value={totals.shares.toLocaleString()} />
        <OverviewCard label="Follows" value={totals.followers.toLocaleString()} />
      </div>
      <ViewsChart data={posts} />
      <VpnComparisonChart posts={posts} />
      <PostsTable posts={posts} />
    </div>
  );
}

export default Dashboard;