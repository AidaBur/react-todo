import React from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.ListItem}>
      <FaCheckCircle style={{ marginRight: "8px", color: "#3E89FF" }} />
      {todo.title}
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className={styles.removeButton}
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoListItem;
