import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ScheduleStateInterface } from './state';
import axios from 'axios';
// import { useStore } from 'src/store';

const actions: ActionTree<ScheduleStateInterface, StateInterface> = {
  async addEvent({ commit }, userId: string) {
    // const $store = useStore();
    const event = await axios({
      method: 'get',
      url: `http://localhost:3000/schedule/${userId}/`,
      // headers: {
      //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      //   Authorization: `Bearer ${$store.state.accessToken}`,
      // },
    });
    commit('ADD_EVENT', event.data);
  },
};

export default actions;
