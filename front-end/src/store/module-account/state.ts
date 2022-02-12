export interface AccountStateInterface {
  prop: boolean;
  followers: string[];
  followings: string[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    followers: [],
    followings: [],
  };
}

export default state;
