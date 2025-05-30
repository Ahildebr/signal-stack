import React from "react";
import { useState } from "react";

function NewPostForm({ onAddPost }) {
  const [formData, setFormData] = useState({
    title: "",
    views: "",
    likes: "",
    shares: "",
    followers: "",
    postedAt: "",
    vpn: "off",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: Date.now(),
      views: parseInt(formData.views),
      likes: parseInt(formData.likes),
      shares: parseInt(formData.shares),
      followers: parseInt(formData.followers),
    };
    onAddPost(newPost);
    setFormData({
      title: "",
      views: "",
      likes: "",
      shares: "",
      followers: "",
      postedAt: "",
      vpn: "off",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl space-y-4">
      <h2 className="text-xl font-bold text-white">Add New Post</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" required />
        <input name="views" placeholder="Views" value={formData.views} onChange={handleChange} type="number" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} type="number" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="shares" placeholder="Shares" value={formData.shares} onChange={handleChange} type="number" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="followers" placeholder="Follows" value={formData.followers} onChange={handleChange} type="number" className="p-2 rounded bg-gray-700 text-white" required />
        <input name="postedAt" placeholder="Posted At" value={formData.postedAt} onChange={handleChange} type="datetime-local" className="p-2 rounded bg-gray-700 text-white" required />
        <select name="vpn" value={formData.vpn} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white">
          <option value="off">VPN Off</option>
          <option value="on">VPN On</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Post</button>
    </form>
  );
}

export default NewPostForm;
