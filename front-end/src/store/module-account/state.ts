interface follow {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
      properties: { isFollower: boolean; isFollowing: boolean };
    }
  ];
}

interface block {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
    }
  ];
}

export interface AccountStateInterface {
  prop: boolean;
  owner: follow[];
  followers: follow[];
  followings: follow[];
  blockList: block[];
  blockListId: string[];
}

function state(): AccountStateInterface {
  return {
    prop: false,
    owner: [],
    followers: [],
    followings: [],
    blockList: [],
    blockListId: [],
  };
}

export default state;
