import React, { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/ NavBar";
import HomePage from "./pages/HomePage";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortByDateOrder, setSortByDateOrder] = useState("asc");
  const [sortByTitleOrder, setSortByTitleOrder] = useState("asc");
  const [filter, setFilter] = useState("all"); 

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
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
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title || "Untitled",
        completed: record.fields.completed || false,
        createdDate: record.fields.createdDate,
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
          createdDate: new Date().toISOString(),
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
        createdDate: data.fields.createdDate,
      };

      setTodoList((prevList) => [...prevList, addedTodo]);
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

  const editTodoHandler = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
  };

  const saveEditHandler = async (todo, updatedTitle) => {
    if (!todo || updatedTitle === todo.title) return;

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: updatedTitle,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${todo.id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodoList((prevList) =>
        prevList.map((t) =>
          t.id === todo.id ? { ...t, title: updatedTodo.fields.title } : t
        )
      );

      setEditTodo(null);
      setEditTitle("");
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

  const sortByDateHandler = () => {
    setSortByDateOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  
  const sortByTitleHandler = () => {
    setSortByTitleOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filterTodos = (todos, filter) => {
    if (filter === "completed") {
      return todos.filter(todo => todo.completed);
    } else if (filter === "inProgress") {
      return todos.filter(todo => !todo.completed);
    }
    return todos; // "all" by default
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedByDateTodos = [...todoList].sort((a, b) => {
    if (sortByDateOrder === "asc") {
      if (new Date(a.createdDate) > new Date(b.createdDate)) return 1;
      if (new Date(a.createdDate) < new Date(b.createdDate)) return -1;
    } else {
      if (new Date(a.createdDate) < new Date(b.createdDate)) return 1;
      if (new Date(a.createdDate) > new Date(b.createdDate)) return -1;
    }
    return 0;
  });

  const sortedByTitleTodos = [...todoList].sort((a, b) => {
    if (sortByTitleOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  
  const finalSortedTodos = sortByDateOrder === "asc" ? sortedByDateTodos : sortedByTitleTodos;


  const filteredTodos = filterTodos(finalSortedTodos, filter);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/todos"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              
              <button
                    onClick={() => setFilter("all")}
                    className={`filter-button ${filter === "all" ? "active" : ""}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`filter-button ${filter === "completed" ? "active" : ""}`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setFilter("inProgress")}
                    className={`filter-button ${filter === "inProgress" ? "active" : ""}`}
                  >
                    In Progress
                  </button>
                  <button className="sort-button" onClick={sortByDateHandler}>
                    {sortByDateOrder === "asc" ? "Date ↑" : "Date ↓"}
                  </button>
                  <button className="sort-button" onClick={sortByTitleHandler}>
                    {sortByTitleOrder === "asc" ? "(A-Z)" : "(Z-A)"}
                  </button>

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList
                  todoList={filteredTodos}
                  onRemoveTodo={removeTodo}
                  onToggleComplete={toggleComplete}
                  onEditTodo={editTodoHandler}
                  onSaveEdit={saveEditHandler}
                />
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
