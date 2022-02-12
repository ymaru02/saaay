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
  blockList: string[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    followers: [],
    followings: [],
    blockList: [],
  };
}

export default state;
