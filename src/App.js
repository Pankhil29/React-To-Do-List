import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (input.trim() === "") return;

    if (editId !== null) {
      const updated = tasks.map((task, i) => (i === editId ? input : task));
      setTasks(updated);
      setEditId(null);
    } else {
      setTasks([...tasks, input]);
    }
    setInput("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
    <div className="container py-5 ">
      <h2 className="text-center mb-4">📝 To-Do List</h2>

      {/* Input Group */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* No tasks */}
      {tasks.length === 0 ? (
        <p className="text-center">No tasks available</p>
      ) : (
        <ul className="task-list  mb-3">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="d-flex task-item justify-content-between align-items-center"
            >
              <span>{task}</span>
              <div className="btn-group">
                <button className="btn" onClick={() => handleEdit(i)}>
                  ✏️
                </button>
                <button className="btn" onClick={() => handleDelete(i)}>
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <div className="text-center">
          <button className="clear-btn btn btn-danger" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
