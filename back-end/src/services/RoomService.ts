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
    notice: string,
    participates: string[]
  ): Room {
    const newRoom = new Room(
      this.generateId.toString(),
      roomName,
      category,
      moderator,
      notice,
      participates
    );
    console.log(newRoom);
    this.generateId++;
    ROOMS.push(newRoom);
    return newRoom;
  } // end CreateRoom

  public getRooms(): Room[] {
    return ROOMS;
  }

  public getRoom(id: string): Room {
    const roomIndex = ROOMS.findIndex((room) => room.id === id);
    if (roomIndex < 0) {
      throw new Error("Could not find room!");
    }
    return ROOMS[roomIndex];
  }
  /*
  public updateRoom(
    roomName: string,
    category: string[],
    moderator: string[],
    notice: string,
    participates: string[]
  ): Room {
    const roomIndex = ROOMS.findIndex((room) => room.id === id);

    if (todoIndex < 0) {
      throw new Error("Could not find todo!");
    }

    ROOMS[todoIndex] = new ROOM(ROOMS[todoIndex].id, text);

    return ROOMS[todoIndex];
  }
*/
  public deleteRoom(id: string): void {
    const todoIndex = ROOMS.findIndex((room) => room.id === id);

    if (todoIndex < 0) {
      throw new Error("Could not find room!");
    }

    ROOMS.splice(todoIndex, 1);
  }
}
