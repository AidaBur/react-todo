import React from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <li className={styles.listItem}>
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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
