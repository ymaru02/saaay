import { Injectable } from '@nestjs/common';
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../repositories/schedule.repository';

@Injectable()
export class ScheduleService {
  public async getScheduleList(email: string) {
    const result = await getScheduleList(email);
    return result;
  }

  public async createSchedule(
    email: string,
    id: string,
    start: string,
    end: string,
    title: string,
    allDay: boolean,
  ) {
    const result = await createSchedule(email, id, title, start, end, allDay);
    return result;
  }

  public async updateSchedule(
    email: string,
    id: string,
    title: string,
    start: string,
    end: string,
    allDay: boolean,
  ) {
    const result = await updateSchedule(email, id, title, start, end, allDay);
    return result;
  }

  public async deleteSchedule(email: string, id: string) {
    const result = await deleteSchedule(email, id);
    return result;
  }
}
