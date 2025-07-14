import React, { useEffect } from "react";
import { useState } from "react";
import PostsTable from "./PostsTable";
import SplitText from "/src/animations/SplitText.jsx";
import OverviewCard from "./OverviewCard";
import NewPostForm from "./NewPostForm";
import ViewsChart from "./ViewsChart";
import LikesVsSharesChart from "./LikesVsSharesChart";
import ViewsByDayChart from "./ViewsByDayChart";
import ViewsLikesPerPostChart from "./ViewsLikesPerPostChart";





function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/posts")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error Loading Posts", error));
  }, []);

  const totals = posts.reduce(
    (acc, post) => {
      acc.views += post.views;
      acc.likes += post.likes;
      acc.shares += post.shares;
      return acc;
    },
    { views: 0, likes: 0, shares: 0 }
  );

  function handleAddPost(newPost) {
    setPosts([newPost, ...posts]);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <SplitText
          text="Trend Spotter"
          className="text-4xl font-extrabold text-white mb-4"
          splitType="chars"
          textAlign="center"
          delay={120}
        />
      </div>

      <NewPostForm onAddPost={handleAddPost} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <OverviewCard label="Views" value={totals.views.toLocaleString()} />
        <OverviewCard label="Likes" value={totals.likes.toLocaleString()} />
        <OverviewCard label="Shares" value={totals.shares.toLocaleString()} />
      </div>
      <ViewsChart data={posts} />
      <LikesVsSharesChart posts={posts} />
      <ViewsByDayChart posts={posts} />
      <ViewsLikesPerPostChart posts={posts} />
      <PostsTable posts={posts} />
    </div>
  );
}

export default Dashboard;