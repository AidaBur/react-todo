import React from "react";

const TodoList = () => {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "task-2" },
    { id: 3, title: "task-3" },
  ];

  return (
    <ul>
      {todoList.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
