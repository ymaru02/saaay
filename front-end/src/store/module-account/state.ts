interface follow {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
      properties: { isFollower: boolean; isFollowing: boolean };
    }
  ];
}

export interface AccountStateInterface {
  prop: boolean;
  followers: follow[];
  followings: follow[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    followers: [],
    followings: [],
  };
}

export default state;
