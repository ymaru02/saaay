import { MutationTree } from 'vuex';
import { AccountStateInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  getFollowerList(state: AccountStateInterface, data: string[]) {
    state.followers = data;
  },

  getFollowingList(state: AccountStateInterface, data: string[]) {
    state.followings = data;
  },
};

export default mutation;
