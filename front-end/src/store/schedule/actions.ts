import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ScheduleStateInterface } from './state';

const actions: ActionTree<ScheduleStateInterface, StateInterface> = {
  addEvent({ commit }, event) {
    console.log(event);
    commit('ADD_EVENT', event);
  },
};

export default actions;
