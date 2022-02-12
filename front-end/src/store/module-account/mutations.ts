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

interface block {
  keys: string[];
  _fields: [
    {
      identity: { low: string; high: string };
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

  getBlockList(state: AccountStateInterface, data: block[]) {
    state.blockList = data;

    for (const block of state.blockList) {
      state.blockListId.push(block._fields[0].identity.low);
    }
  },

  addMyBlockList(state: AccountStateInterface, target: block) {
    // state.blockList.push(target);

    state.blockListId.push(target._fields[0].identity.low);
  },

  deleteMyBlockList(state: AccountStateInterface, targetId: string) {
    // state.blockList = state.blockList.filter(function (block) {
    //   return block._fields[0].identity.low !== targetId;
    // });

    state.blockListId = state.blockListId.filter(function (id) {
      return id !== targetId;
    });
  },
};

export default mutation;
