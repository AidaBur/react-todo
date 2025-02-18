import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";  
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo, onToggleComplete, onEditTodo }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.taskContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, !todo.completed)}
          className={styles.checkbox}
        />
        <span className={todo.completed ? styles.completed : ""}>
          {todo.title}
        </span>
      </div>

      <p className={styles.createdDate}>
        {new Date(todo.createdDate).toLocaleDateString()}
      </p>

      <div className={styles.buttonsContainer}>
        <button
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
          className={styles.removeButton}
        >
          <FaTrash />
        </button>
       
        <button
          type="button"
          onClick={() => onEditTodo(todo)}  
          className={styles.editButton}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,  
  createdDate: PropTypes.string.isRequired,
};

export default TodoListItem;
