import React from "react";

const App = () => {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "task-2" },
    { id: 3, title: "task-3" },
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
