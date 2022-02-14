import { MutationTree } from 'vuex';
import { ScheduleStateInterface } from './state';

interface save_event {
  identity: { low: string; high: string };
  properties: {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
  };
}

const mutation: MutationTree<ScheduleStateInterface> = {
  ADD_EVENT(state: ScheduleStateInterface, save_event: save_event[]) {
    const temp: Array<object> = [];
    for (const eve of save_event) {
      const event = {
        id: eve.identity.low,
        title: eve.properties.title,
        start: eve.properties.start,
        end: eve.properties.end,
        allDay: eve.properties.allDay,
      };
      temp.push(event);
    }
    state.events = temp;
  },
};

export default mutation;
