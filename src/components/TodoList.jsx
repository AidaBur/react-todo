import React, { useState } from "react";
import TodoListItem from "./TodoListItem/TodoListItem";
import MenuBar from "./ NavBar";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

const TodoList = ({ todoList, onRemoveTodo, onToggleComplete, onSaveEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEditTodo = (todo) => {
    setEditableTodo(todo);
    setNewTitle(todo.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableTodo(null);
  };

  const handleSave = () => {
    if (editableTodo) {
      onSaveEdit(editableTodo, newTitle);
    }
    closeModal();
  };

  return (
    <div>
      <MenuBar />
      <ul className={styles.cardsContainer}>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onToggleComplete={onToggleComplete}
            onEditTodo={handleEditTodo}
          />
        ))}
      </ul>

      {isModalOpen && editableTodo && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Task</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};

export default TodoList;
