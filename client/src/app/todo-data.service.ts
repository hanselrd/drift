import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  lastId: number = 0;
  todos: Todo[] = []; // placeholder

  constructor() { }

  // POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id != id);
    return this;
  }

  toggleTodoComplete(todo: Todo): Todo {
    return this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
  }
}
