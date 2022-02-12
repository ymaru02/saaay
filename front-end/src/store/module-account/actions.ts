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

  async getFollowingList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/following`
    );
    commit('getFollowingList', result.data);
  },

  async addMyFollowingList({ commit }, targetId: string) {
    await axios.post(`http://localhost:3000/accounts/${targetId}/follow`);
    commit('addMyFollowingList', targetId);
  },

  async deleteMyFollowingList({ commit }, targetId: string) {
    await axios.delete(`http://localhost:3000/accounts/${targetId}/follow`);
    commit('deleteMyFollowingList', targetId);
  },

  async getBlockList({ commit }, targetId: string) {
    const result = await axios.get(
      `http://localhost:3000/accounts/${targetId}/blocklist`
    );
    commit('getBlockList', result.data);
  },

  async deleteMyBlockList({ commit }, targetId: string) {
    await axios.delete(`http://localhost:3000/accounts/${targetId}/block`);
    commit('deleteMyBlockList', targetId);
  },
};

export default actions;
