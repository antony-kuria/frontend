"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>📝 Tasks</h1>

        <button
          onClick={fetchTasks}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#f9fafb",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading && <p>Loading tasks…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && tasks.length === 0 && (
        <p style={{ color: "#666" }}>No tasks found.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            <span>{task.title}</span>
            <span style={{ fontSize: "1.2rem" }}>
              {task.completed ? "✅" : "❌"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
