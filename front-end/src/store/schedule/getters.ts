import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ScheduleStateInterface } from './state';

const getters: GetterTree<ScheduleStateInterface, StateInterface> = {
  EVENTS: (state) => state.events,
};

export default getters;
