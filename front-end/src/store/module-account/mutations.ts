import { MutationTree } from 'vuex';
import { AccountStateInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  getFollowerList(state: AccountStateInterface, data: string[]) {
    state.followers = data;
  },
};

export default mutation;
