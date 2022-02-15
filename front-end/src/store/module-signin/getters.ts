import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SigninStateInterface } from './state';

const getters: GetterTree<SigninStateInterface, StateInterface> = {
  getMsg(state) {
    return `${state.message} => Length : ${state.message.length}`;
  },
  getUser(state) {
    return state.user;
  }
};

export default getters;
