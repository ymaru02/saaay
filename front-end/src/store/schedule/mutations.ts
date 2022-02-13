import { MutationTree } from 'vuex';
import { ScheduleStateInterface } from './state';

const mutation: MutationTree<ScheduleStateInterface> = {
  ADD_EVENT(state, event) {
    console.log(event);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    state.events.push(event);
  },
};

export default mutation;
