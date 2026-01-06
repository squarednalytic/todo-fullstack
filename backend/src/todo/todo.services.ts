import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(search?: string): Todo[] {
    if (search) {
      const searchLower = search.toLowerCase();
      return this.todos.filter(todo => 
        todo.title.toLowerCase().includes(searchLower)
      );
    }
    return [...this.todos];
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  toggleComplete(id: number): Todo {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      completed: !this.todos[todoIndex].completed,
    };
    
    return this.todos[todoIndex];
  }
}