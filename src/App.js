import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editId ? input : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditId(index);
  };

  const handleClearAll = () => {
    setTasks([]);
    setInput("");
    setEditId(null);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="no-task">No tasks available</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, i) => (
            <li key={i} className="task-item">
              <span>{task}</span>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => handleEdit(i)}>
                  ✏️
                </button>
                <button className="delete-btn" onClick={() => handleDelete(i)}>
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default App;
