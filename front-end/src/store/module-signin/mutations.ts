import { MutationTree } from 'vuex';
import { SigninStateInterface } from './state';
import { User } from './user.model';

const mutation: MutationTree<SigninStateInterface> = {
  changeMessage(state, newMsg: string) {
    state.message = newMsg;
  },

  authenticate(state, user: User) {
    state.user = user;
  },
};

export default mutation;
