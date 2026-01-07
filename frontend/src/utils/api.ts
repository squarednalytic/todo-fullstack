import axios from 'axios';
import { Todo } from '../types/todo.types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export const todoApi = {
  // Get todos with optional search
  getTodos: (search?: string) => 
    api.get<Todo[]>('/api/todos', {
      params: { search },
    }),

  // Create new todo
  createTodo: (title: string) =>
    api.post<Todo>('/api/todos', { title }),

  // Toggle todo completion
  toggleTodo: (id: number) =>
    api.patch<Todo>(`/api/todos/${id}`),

  // Delete todo (optional enhancement)
  deleteTodo: (id: number) =>
    api.delete(`/api/todos/${id}`),
};

export default api;