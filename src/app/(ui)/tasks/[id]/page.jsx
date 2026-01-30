"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function TaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    description: "",
    tags: ""
  });

  const [loading, setLoading] = useState(true);

  // OPTIONAL: only works if you add GET /api/tasks/{id} in backend
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const data = await res.json();
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      alert("Task updated!");
    } else {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      router.push("/tasks");
    } else {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
  <div
    style={{
      maxWidth: "600px",
      margin: "3rem auto",
      padding: "2rem",
      borderRadius: "12px",
      background: "#ffffff",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}
  >
    <h1 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>
      Edit Task #{id}
    </h1>

    <input
      name="title"
      placeholder="Title"
      value={task.title}
      onChange={handleChange}
      style={{
        width: "100%",
        padding: "0.75rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
      }}
    />

    <textarea
      name="description"
      placeholder="Description"
      value={task.description}
      onChange={handleChange}
      rows={4}
      style={{
        width: "100%",
        padding: "0.75rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        resize: "vertical",
      }}
    />

    <input
      name="tags"
      placeholder="Tags (comma separated)"
      value={task.tags}
      onChange={handleChange}
      style={{
        width: "100%",
        padding: "0.75rem",
        marginBottom: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
      }}
    />

    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button
        onClick={handleUpdate}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          background: "#4f46e5",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Update
      </button>

      <button
        onClick={handleDelete}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "1px solid #ef4444",
          background: "transparent",
          color: "#ef4444",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

}
