import { RequestHandler } from "express";

import { Todo } from "../models/SampleRepository";

const TODOS: Todo[] = [];

export class SampleService {
  // 여기에는 DB 커넥션 객체
  private TODOS: Todo[];
  private generateId = 0;

  constructor() {
    this.TODOS = [];
  }

  public createTodo(text: string): Todo {
    const newTodo = new Todo(this.generateId.toString(), text);
    console.log(newTodo);
    this.generateId++;
    this.TODOS.push(newTodo);
    return newTodo;
  }

  public getTodos(): Todo[] {
    return this.TODOS;
  }

  public updateTodo(id: string, text: string): Todo {
    const todoIndex = this.TODOS.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      throw new Error("Could not find todo!");
    }

    this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, text);

    return this.TODOS[todoIndex];
  }

  public deleteTodo(id: string): void {
    const todoIndex = this.TODOS.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      throw new Error("Could not find todo!");
    }

    this.TODOS.splice(todoIndex, 1);
  }
}
