import {
  Param,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ScheduleService } from '../services/schedule.service';

@Controller('/schedule')
export class ScheduleController {
  res: any;
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get('/:userId')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async getScheduleList(@Param('userId') userId: string, @Res() res: Response) {
    const scheduleList = await this.scheduleService.getScheduleList(userId);
    res.status(HttpStatus.OK).json(scheduleList);
  }

  @Post('/:userId/create')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async createSchedule(
    @Param('userId') userId: string,
    @Body()
    params: {
      title: string;
      start: string;
      end: string;
      allDay: boolean;
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.createSchedule(
      userId,
      params.title,
      params.start,
      params.end,
      params.allDay,
    );
    res.status(HttpStatus.CREATED).json(schedule);
  }

  @Put('/:userId/update')
  // 일정 변경
  async updateSchedule(
    @Param('userId') userId: string,
    @Body()
    params: {
      id: string;
      start: string;
      end: string;
      allDay: boolean;
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.updateSchedule(
      userId,
      params.id,
      params.start,
      params.end,
      params.allDay,
    );
    res.status(HttpStatus.OK).json(schedule);
  }

  @Delete('/:userId/delete')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async deleteSchedule(
    @Param('userId') userId: string,
    @Body()
    params: {
      date: string;
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.deleteSchedule(
      userId,
      params.date,
    );
    res.status(HttpStatus.OK).json(schedule);
  }
}
