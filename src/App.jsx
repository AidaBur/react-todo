import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const App = () => {
const [newTodo, setNewTodo] = useState("");
const addTodo = (todoTitle) => {
  setNewTodo(todoTitle);
};

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}/>
      <p>New Todo: {newTodo}</p>
      <TodoList />
    </div>
  );
};

export default App;
