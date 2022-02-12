import { MutationTree } from 'vuex';
import { AccountStateInterface } from './state';

interface follow {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
      properties: { isFollower: boolean; isFollowing: boolean };
    }
  ];
}

const mutation: MutationTree<AccountStateInterface> = {
  getFollowerList(state: AccountStateInterface, data: follow[]) {
    state.followers = data;
  },

  getFollowingList(state: AccountStateInterface, data: follow[]) {
    state.followings = data;
  },

  addMyFollowingList(state: AccountStateInterface, targetId: string) {
    for (const follower of state.followers) {
      if (follower._fields[0].identity.low === targetId) {
        follower._fields[0].properties.isFollowing = true;
      }
    }

    for (const following of state.followings) {
      if (following._fields[0].identity.low === targetId) {
        following._fields[0].properties.isFollowing = true;
      }
    }
  },

  deleteMyFollowingList(state: AccountStateInterface, targetId: string) {
    for (const follower of state.followers) {
      if (follower._fields[0].identity.low === targetId) {
        follower._fields[0].properties.isFollowing = false;
      }
    }

    for (const following of state.followings) {
      if (following._fields[0].identity.low === targetId) {
        following._fields[0].properties.isFollowing = false;
      }
    }
  },

  getBlockList(state: AccountStateInterface, data: string[]) {
    state.blockList = data;
  },
};

export default mutation;
