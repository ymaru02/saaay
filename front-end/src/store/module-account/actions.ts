import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';
import axios from 'axios';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async getFollowerList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/follower`
    );
    commit('getFollowerList', result.data);
  },
};

export default actions;
