import React, { useEffect, useState } from "react";
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
    <div
  className="min-h-screen bg-cover bg-center text-white p-4"
  style={{ backgroundImage: "url('/Dashboard-background.jpg')" }}
>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center">
          <SplitText
            text="Trend Spotter"
            className="text-6xl font-extrabold text-white mb-2"
            splitType="chars"
            textAlign="center"
            delay={120}
          />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 h-[calc(100vh-120px)] overflow-auto">
          
          
          {/* Overview Cards */}
          <div className= "bg-gradient-to-tr from-clear to-pink-500 rounded-xl shadow p-4 col-span-1">
            <OverviewCard label="Likes" value={totals.likes.toLocaleString()} />
          </div>
          <div className= "bg-gradient-to-tr from-clear to-pink-500 rounded-xl shadow p-4 col-span-1">
            <OverviewCard label="Views" value={totals.views.toLocaleString()} />
          </div>
          <div className= "bg-gradient-to-tr from-clear to-pink-500 rounded-xl shadow p-4 col-span-1">
            <OverviewCard label="Shares" value={totals.shares.toLocaleString()} />
          </div>

          
          
          {/* Views Chart (featured) */}
          <div className="bg-gradient-to-bl from-clear to-cyan-500 rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-3 row-span-2">
            <ViewsChart data={posts} />
          </div>

          {/* New Post Form (featured) */}
          <div className="bg-gradient-to-br from-clear to-cyan-500 rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-3 row-span-1">
            <NewPostForm onAddPost={handleAddPost} />
          </div>

          {/* Other Charts */}
          <div className="bg-gradient-to-bl from-cyan-500 to-clear rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-2">
            <LikesVsSharesChart posts={posts} />
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-clear rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-4">
            <ViewsByDayChart posts={posts} />
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-6">
            <ViewsLikesPerPostChart posts={posts} />
          </div>

          {/* Posts Table (full width) */}
          <div className="bg-gradient-to-r from-cyan-500 via-cyan-500 to-pink-500 rounded-xl shadow p-4 col-span-1 sm:col-span-2 lg:col-span-6">
            <PostsTable posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
