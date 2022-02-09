import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { RoomService } from '../services/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  createRoom(
    @Body()
    params: {
      roomName: string;
      category: string[];
      moderator: string[];
      notice: string;
      participates: string[];
    },
    @Res() res: Response,
  ) {
    const room = this.roomService.createRoom(
      params.roomName,
      params.category,
      params.moderator,
      params.notice,
      params.participates,
    );
    res.status(HttpStatus.CREATED).json({ message: 'RoomCreated', room: room });
  }

  @Get('/list')
  getRooms(@Res() res: Response) {
    console.log('/getRooms');
    res.status(HttpStatus.OK);
    const Rooms = this.roomService.getRooms();
    console.log('rooms : ', Rooms);
    res.status(HttpStatus.OK).json(JSON.stringify(Rooms));
  }

  @Get('/:Id')
  getRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('/getRoom');
    res.status(HttpStatus.OK);
    const Room = this.roomService.getRoom(Id);
    res.status(HttpStatus.OK).json(JSON.stringify(Room));
  }

  @Patch(':Id')
  updateRoom(
    @Param('Id') Id: string,
    @Body()
    params: {
      roomName: string;
      category: string[];
      moderator: string[];
      notice: string;
      participates: string[];
    },
    @Res() res: Response,
  ) {
    console.log('updateRoom');
    const room = this.roomService.updateRoom(Id, params);

    res.status(HttpStatus.OK).json({ message: room });
  }

  @Delete('/:Id')
  deleteRoom(@Param('Id') Id: string, @Res() res: Response) {
    console.log('deleteRoom');
    this.roomService.deleteRoom(Id);
    res.status(HttpStatus.OK).json({ message: `id` + 'is deleted' });
  }
}
