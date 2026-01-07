export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export interface TodoFilters {
  search?: string;
  completed?: boolean;
  sortBy?: 'createdAt' | 'title' | 'completed';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: Date;
}