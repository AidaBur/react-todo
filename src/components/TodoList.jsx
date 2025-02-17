import React, { useState } from "react";
import TodoListItem from "./TodoListItem/TodoListItem";
import MenuBar from "./ NavBar";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

const TodoList = ({ todoList, onRemoveTodo, onToggleComplete, onSaveEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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


  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todoList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div>
      <MenuBar />
      <ul className={styles.cardsContainer}>
        {currentTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onToggleComplete={onToggleComplete}
            onEditTodo={handleEditTodo}
          />
        ))}
      </ul>

      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? styles.activePage : ""}
          >
            {number}
          </button>
        ))}
      </div>

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