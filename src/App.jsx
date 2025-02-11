import React, { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // Добавлено: состояние для редактируемой задачи
  const [editTitle, setEditTitle] = useState(""); // Добавлено: состояние для текста редактируемого заголовка
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${
      sortOrder === "asc" ? "asc" : "desc"
    }`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title || "Untitled",
        completed: record.fields.completed || false,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data from Airtable:", error.message);
    }
  };

  const addTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
          completed: false,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Added Todo:", data);

      const addedTodo = {
        id: data.id,
        title: data.fields.title,
        completed: data.fields.completed,
      };

      setTodoList((prevList) => {
        const updatedList = [...prevList, addedTodo];
        return updatedList.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
        });
      });
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error.message);
    }
  };

  // Добавлено: обработка редактирования задачи
  const editTodoHandler = (todo) => {
    setEditTodo(todo); // Устанавливаем задачу для редактирования
    setEditTitle(todo.title); // Устанавливаем текущий заголовок задачи в поле редактирования
  };

  // Добавлено: сохранение изменений редактируемой задачи
  const saveEditHandler = async () => {
    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: editTitle, // Сохраняем новый заголовок
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${editTodo.id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, title: updatedTodo.fields.title }
            : todo
        )
      );
      setEditTodo(null); // Закрываем форму редактирования
      setEditTitle(""); // Очищаем поле редактирования
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          completed: completed, 
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodo = await response.json();

      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === id
            ? { ...todo, completed: updatedTodo.fields.completed }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/todos"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              <button onClick={toggleSortOrder}>
                Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </button>

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList
                  todoList={todoList}
                  onRemoveTodo={removeTodo}
                  onToggleComplete={toggleComplete}
                  onEditTodo={editTodoHandler} // Передаем обработчик редактирования
                />
              )}

              {/* Добавлено: форма для редактирования задачи */}
              {editTodo && (
                <div>
                  <h2>Edit Todo</h2>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={saveEditHandler}>Save</button>
                  <button onClick={() => setEditTodo(null)}>Cancel</button>
                </div>
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
