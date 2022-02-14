export interface ScheduleStateInterface {
  prop: boolean;
  events: Array<object>;
  accessToken: string;
}

function state(): ScheduleStateInterface {
  return {
    prop: false,
    events: [],
    accessToken: '',
  };
}

export default state;
