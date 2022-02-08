import { RequestHandler } from "express";

import { RoomService } from "../services/RoomService";

const roomService = new RoomService();

export const createRoom: RequestHandler = (req, res, next) => {
  // console.log("createRoom");
  const roomName = (req.body as { roomName: string }).roomName;
  // console.log("roomName : ", roomName);
  const category = (req.body as { category: string[] }).category;
  // console.log("category : ", category);
  const moderator = (req.body as { moderator: string[] }).moderator;
  // console.log("moderator : ", moderator);
  const notice = (req.body as { notice: string }).notice;
  // console.log("notice : ", notice);
  const participates = (req.body as { participates: string[] }).participates;
  console.log("body = ", req.body);

  const newRoom = roomService.createRoom(roomName, category, moderator, notice, participates);
  // console.log("controller test", roomName, notice);
  res.status(201).json({ message: "Created the new Room.", createRoom: newRoom });
};

export const getRooms: RequestHandler = (req, res, next) => {
  console.log("getRooms");
  const rooms = roomService.getRooms();
  // console.log(rooms);
  res.json({ rooms: rooms });
};

export const getRoom: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log("getRoom");
  const roomId = req.params.id;

  const room = roomService.getRoom(roomId);

  res.json({ room: room });
};

/*
export const updateRoom: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log("updateTodo");
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  console.log("id: ", todoId);

  const updatedTodo = roomService.updateRoom(todoId, updatedText);

  res.json({ message: "Updated!", updatedTodo: updatedTodo });
};
*/
export const deleteRoom: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log("deleteTodo");
  const todoId = req.params.id;

  roomService.deleteRoom(todoId);

  res.json({ message: "Room deleted!" });
};
