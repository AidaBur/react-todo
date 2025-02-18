import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import styles from "./AddTodoForm.module.css";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!todoTitle.trim()) return;

    const newTodo = {
      title: todoTitle,
      id: Date.now(),
      createdAt: new Date().toLocaleString(), 
    };

    onAddTodo(newTodo); 
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <input
        id="todo-title"
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add Todo"
        className={styles.input}
      />
      <button type="submit" className={styles.addButton}>
        <FaPlus className={styles.buttonIcon} />
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
