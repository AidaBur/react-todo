import React from 'react';
import TodoListItem from './TodoListItem/TodoListItem';
import PropTypes from 'prop-types';
import styles from './TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo, onToggleComplete, onEditTodo }) => {
  return (
    <ul className={styles.cardsContainer}>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <TodoListItem 
            todo={todo} 
            onRemoveTodo={onRemoveTodo} 
            onToggleComplete={onToggleComplete} 
            onEditTodo={onEditTodo}  
          />
        </li>
      ))}
    </ul>
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
