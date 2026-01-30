"use client";

import { useState } from "react";


export default function CreateTask() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    const body = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(body);

      if (response.ok) {
        console.log("Task created successfully");
        // Handle success, e.g., show a success message or redirect to another page
      } else {
        console.error("Failed to create task");
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
    // Refresh the page
    location.reload();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <div className="mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md mt-10">
    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create a Task</h1>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          placeholder="Enter task description"
        ></textarea>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Tags</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Comma separated tags"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Create Task
      </button>
    </form>
  </div>
);

}


