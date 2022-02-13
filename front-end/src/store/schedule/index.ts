import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ScheduleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const ShceduleModule: Module<ScheduleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default ShceduleModule;
