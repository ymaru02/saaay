import { Router } from "express";

import { createRoom, getRooms } from "../controllers/RoomController";

const router = Router();
const roomRouter: string = "/";
router.post("/", createRoom);
router.get("/list", getRooms);

export default router;
