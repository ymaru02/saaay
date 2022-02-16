import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ScheduleStateInterface } from './state';
import axios from 'axios';
import { Cookies } from 'quasar';
const accessToken: string = Cookies.get('access_token');

const actions: ActionTree<ScheduleStateInterface, StateInterface> = {
  async getEvent({ commit }) {
    const result = await axios({
      method: 'get',
      url: 'http://localhost:3000/schedule/',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    commit('GET_EVENT', result.data);
  },

  async deleteEvent({}, eventId: string) {
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/schedule/delete',
      data: {
        id: eventId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  // async createEvent({}, event: object) {
  //   await axios({
  //     method: 'post',
  //     url: 'http://localhost:3000/schedule/create',
  //     data: event,
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // },

  async updateEvent({}, event: object) {
    await axios({
      method: 'put',
      url: 'http://localhost:3000/schedule/update',
      data: event,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default actions;
