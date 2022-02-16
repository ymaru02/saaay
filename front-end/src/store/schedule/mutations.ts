import { MutationTree } from 'vuex';
import { ScheduleStateInterface } from './state';
interface save_event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

const mutation: MutationTree<ScheduleStateInterface> = {
  GET_EVENT(state: ScheduleStateInterface, save_event: save_event[]) {
    console.log(save_event);
    state.events = save_event;
  },
};

export default mutation;
