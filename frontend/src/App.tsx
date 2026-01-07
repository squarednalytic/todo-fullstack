import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API_BASE_URL = 'http://localhost:3000/api/todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = search ? `${API_BASE_URL}?search=${encodeURIComponent(search)}` : API_BASE_URL;
      const response = await axios.get<Todo[]>(url);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      setError('Todo title cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<Todo>(API_BASE_URL, {
        title: newTodo
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${API_BASE_URL}/${id}`);
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      
      <main className="container">
        {/* Error Display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Search Input */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            disabled={loading}
          />
        </div>

        {/* Add Todo Section */}
        <div className="add-todo-section">
          <input
            type="text"
            placeholder="Enter new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="todo-input"
            disabled={loading}
          />
          <button 
            onClick={addTodo} 
            className="add-button"
            disabled={loading || !newTodo.trim()}
          >
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        {/* Todo List */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">No todos found</p>
          ) : (
            <table className="todo-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <td>{index + 1}</td>
                    <td>{todo.title}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        disabled={loading}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;