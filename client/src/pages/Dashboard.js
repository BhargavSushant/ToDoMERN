import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quadrant, setQuadrant] = useState(2);
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3001/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          quadrant: Number(quadrant),
          dueDate: dueDate || null,
        }),
      });
      if (res.ok) {
        await fetchTasks();
        setTitle("");
        setDescription("");
        setQuadrant(2);
        setDueDate("");
      } else {
        alert("Error creating task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Group tasks by quadrant
  const quadrantGroups = [[], [], [], []];
  tasks.forEach((task) => {
    const qIndex = (task.quadrant || 2) - 1; // quadrant is 1-4
    if (qIndex >= 0 && qIndex < 4) {
      quadrantGroups[qIndex].push(task);
    }
  });

  return (
    <div className="mt-5">
      <h2 className="text-3xl font-bold text-center mb-4">
        Dashboard (Eisenhower Matrix)
      </h2>

      {/* Add Task Form */}
      <form
        onSubmit={handleCreateTask}
        className="max-w-lg mx-auto mb-8 bg-white p-4 rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-3">Create New Task</h3>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block mb-1">Quadrant (1-4)</label>
        <select
          className="w-full p-2 border rounded mb-2"
          value={quadrant}
          onChange={(e) => setQuadrant(e.target.value)}
        >
          <option value="1">Q1: Urgent & Important</option>
          <option value="2">Q2: Important, Not Urgent</option>
          <option value="3">Q3: Urgent, Not Important</option>
          <option value="4">Q4: Neither Urgent Nor Important</option>
        </select>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Create Task
        </button>
      </form>

      {/* Matrix Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1 */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-3">
            Quadrant 1 (Urgent & Important)
          </h3>
          {quadrantGroups[0].map((task) => (
            <div key={task._id} className="border p-2 rounded mb-2">
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Quadrant 2 */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-3">
            Quadrant 2 (Important, Not Urgent)
          </h3>
          {quadrantGroups[1].map((task) => (
            <div key={task._id} className="border p-2 rounded mb-2">
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Quadrant 3 */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-3">
            Quadrant 3 (Urgent, Not Important)
          </h3>
          {quadrantGroups[2].map((task) => (
            <div key={task._id} className="border p-2 rounded mb-2">
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Quadrant 4 */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-3">
            Quadrant 4 (Neither Urgent nor Important)
          </h3>
          {quadrantGroups[3].map((task) => (
            <div key={task._id} className="border p-2 rounded mb-2">
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toDateString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
