import { User } from './user.model';

export interface SigninStateInterface {
  prop: boolean;
  message: string;
  user: User;
}

function state(): SigninStateInterface {
  return {
    prop: false,
    message: 'Hello',
    user: {
      email: 'string',
      username: 'string',
      biography: 'string',
      follower: [],
      following: []
    },
  };
}

export default state;
