import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ScheduleStateInterface } from './state';
import axios from 'axios';

const actions: ActionTree<ScheduleStateInterface, StateInterface> = {
  async deleteEvent({}, eventId: string) {
    void (await axios({
      method: 'delete',
      url: 'http://localhost:3000/schedule/delete',
      data: {
        id: eventId,
      },
    }));
  },

  async createEvent({}, event: object) {
    void (await axios({
      method: 'post',
      url: 'http://localhost:3000/schedule/create',
      data: event,
    }));
  },

  async updateEvent({}, event: object) {
    void (await axios({
      method: 'put',
      url: 'http://localhost:3000/schedule/update',
      data: event,
    }));
  },
};

export default actions;
