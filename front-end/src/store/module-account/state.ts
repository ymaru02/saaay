export interface AccountStateInterface {
  prop: boolean;
  followers: string[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    followers: [],
  };
}

export default state;
