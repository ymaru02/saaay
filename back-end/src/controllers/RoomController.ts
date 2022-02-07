import { RequestHandler } from "express";

import { RoomService } from "../services/RoomService";

const roomService = new RoomService();

export const createRoom: RequestHandler = (req, res, next) => {
  console.log("createRoom");
  const roomName = (req.body as { roomName: string }).roomName;
  const category = (req.body as { category: string[] }).category;
  const moderator = (req.body as { moderator: string[] }).moderator;
  const notice = (req.body as { notice: string }).notice;

  const newRoom = roomService.createRoom(roomName, category, moderator, notice);

  res.status(201).json({ message: "Created the new Room.", createRoom: newRoom });
};
/*
export const getTodos: RequestHandler = (req, res, next) => {
  console.log("getTodos");
  const todos = sampleService.getTodos();
  res.json({ todos: todos });
};
*/

/*
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log("updateTodo");
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  console.log("id: ", todoId);

  const updatedTodo = sampleService.updateTodo(todoId, updatedText);

  res.json({ message: "Updated!", updatedTodo: updatedTodo });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  console.log("deleteTodo");
  const todoId = req.params.id;

  sampleService.deleteTodo(todoId);

  res.json({ message: "Todo deleted!" });
};
*/
