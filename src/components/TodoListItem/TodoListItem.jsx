// TodoListItem/TodoListItem.js
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";  // Добавим иконку редактирования
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
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
          className={styles.removeButton}
        >
          <FaTrash />
        </button>
        {/* Кнопка редактирования */}
        <button
          type="button"
          onClick={() => onEditTodo(todo)}  // Вызов функции редактирования
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
  onEditTodo: PropTypes.func.isRequired,  // Добавляем обработчик редактирования
};

export default TodoListItem;
