import { Injectable } from '@nestjs/common';
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../repositories/schedule.repository';

@Injectable()
export class ScheduleService {
  public async getScheduleList(userId: string) {
    const result = await getScheduleList(userId);
    return result;
  }

  public async createSchedule(
    userId: string,
    start: string,
    end: string,
    title: string,
    allDay: boolean,
  ) {
    const result = await createSchedule(userId, title, start, end, allDay);
    return result;
  }

  public async updateSchedule(
    userId: string,
    id: string,
    start: string,
    end: string,
    allDay: boolean,
  ) {
    const result = await updateSchedule(userId, id, start, end, allDay);
    return result;
  }

  public async deleteSchedule(userId: string, date: string) {
    const result = await deleteSchedule(userId, date);
    return result;
  }
}
