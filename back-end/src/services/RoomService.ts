import { RequestHandler } from "express";
import { Todo } from "../models/SampleRepository";
import { Room } from "../models/RoomModel";

const ROOMS: Room[] = [];

export class RoomService {
  // private ROOMS: Room[];
  private generateId = 0;

  constructor() {
    // this.ROOMS = [];
  }

  public createRoom(
    roomName: string,
    category: string[],
    moderator: string[],
    notice: string
  ): Room {
    const newRoom = new Room(this.generateId.toString(), roomName, category, moderator, notice);
    console.log(newRoom);
    this.generateId++;
    ROOMS.push(newRoom);
    return newRoom;
  } // end CreateRoom

  public getRooms(): Room[] {
    return ROOMS;
  }

  /*
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
  */
}
