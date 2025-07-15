import React from "react";
import { useState } from "react";







const BASE_URL = import.meta.env.VITE_API_BASE


function NewPostForm({ onAddPost }) {
  const [formData, setFormData] = useState({
    title: "",
    views: "",
    likes: "",
    shares: "",
    followers: "",
    posted_at: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
  e.preventDefault();

  const localDateTime = formData.posted_at;
  const isoDate = new Date(localDateTime).toISOString();
  console.log("Formatted ISO datetime →", isoDate);

  const newPostData = {
    title: formData.title,
    views: parseInt(formData.views),
    likes: parseInt(formData.likes),
    shares: parseInt(formData.shares),
    posted_at: isoDate,
  };
  console.log("POST BODY →", newPostData);
  fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPostData)
  })
    .then((r) => {
      if (!r.ok) throw new Error("Failed to post");
      return r.json();
    })
    .then((newPost) => {
      onAddPost(newPost); // Add to frontend
      setFormData({
        title: "",
        views: "",
        likes: "",
        shares: "",
        posted_at: "",
      });
    })
    .catch((err) => console.error("Error posting:", err));
}

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-xl space-y-4">
      <h2 className="text-xl font-bold text-white">Add New Post</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white" required />
        <input name="views" placeholder="Views" value={formData.views} onChange={handleChange} type="number" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} type="number" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="shares" placeholder="Shares" value={formData.shares} onChange={handleChange} type="number" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="posted_at" placeholder="Posted At" value={formData.posted_at} onChange={handleChange} type="datetime-local" className="p-2 rounded bg-gray-800 text-white" required />
      </div>
      <button type="submit" className="px-4 py-2 bg-gradient-to-tr from-cyan-500 to-pink-500 text-white rounded">Add Post</button>
    </form>
  );
}

export default NewPostForm;
