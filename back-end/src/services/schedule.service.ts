import { Injectable } from '@nestjs/common';
import { getScheduleList, createSchedule, updateSchedule, deleteSchedule } from '../repositories/schedule.repository'

@Injectable()
export class ScheduleService {
  public async getScheduleList(email: string) {
    const result = await getScheduleList(email);
    return result;
  }

  public async createSchedule(email: string, date: string) {
    const result = await this.createSchedule(email, date);
    return result;
  }

  public async updateSchedule(email: string, date: string, update_date: string) {
    const result = await this.updateSchedule(email, date, update_date);
    return result;
  }

  public async deleteSchedule(email: string, date: string) {
    const result = await deleteSchedule(email, date);
    return result;
  }
}