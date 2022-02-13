export interface ScheduleStateInterface {
  prop: boolean;
  events: Array<object>;
}

function state(): ScheduleStateInterface {
  return {
    prop: false,
    events: [],
  };
}

export default state;
