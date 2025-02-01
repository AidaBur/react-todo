import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';


const AddTodoForm = (props) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };
    props.onAddTodo(newTodo);
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel 
        id="todo-title"
        value={todoTitle} 
        onChange={(e) => setTodoTitle(e.target.value)}
      >
        Title
      </InputWithLabel>
      <button type="submit">Add Todo</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
