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
import { ScheduleService } from '../services/schedule.service';

@Controller('/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}


  @Get(':userId/')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async getScheduleList(
    @Param('userId') email: string,
    @Res() res: Response,
  ) {
    const scheduleList = await this.scheduleService.getScheduleList(email);
    res.status(HttpStatus.OK).json(scheduleList);
  }

  @Post(':userId/create')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async createSchedule(
    @Body()
    params: {
      email: string,
      date: string,
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.createSchedule(params.email, params.date);
    res.status(HttpStatus.OK).json(schedule);
  }

  @Patch(':userId/update')
  // 일정 변경
  async updateSchedule(
    @Body()
    params: {
      email: string,
      date: string,
      update_date: string
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.updateSchedule(params.email, params.date, params.update_date);
    res.status(HttpStatus.OK).json(schedule);
  }

  @Delete(':userId/delete')
  // 방을 생성할 일정을 잡은 사람을 기준으로 일정을 가져온다.
  async deleteSchedule(
    @Body()
    params: {
      email: string,
      date: string,
    },
    @Res() res: Response,
  ) {
    const schedule = await this.scheduleService.deleteSchedule(params.email, params.date);
    res.status(HttpStatus.OK).json(schedule);
  }
}