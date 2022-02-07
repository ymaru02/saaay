import { Router } from "express";

import { createRoom } from "../controllers/RoomController";

const router = Router();
const roomRouter: string = "/room";
router.post(roomRouter, createRoom);

export default router;
