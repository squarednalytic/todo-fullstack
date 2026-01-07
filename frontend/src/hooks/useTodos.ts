import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo.types';
import { todoApi } from '../utils/api';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  };
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (search?: string): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await todoApi.getTodos(search);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos. Please check your connection.');
      console.error('Fetch todos error:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const addTodo = async (title: string) => {
    if (!title.trim()) {
      setError('Todo title cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await todoApi.createTodo(title);
      setTodos(prev => [response.data, ...prev]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Add todo error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.toggleTodo(id);
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error('Toggle todo error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Delete todo error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    completionRate: todos.length > 0 
      ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100)
      : 0,
  };

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos,
  };
};