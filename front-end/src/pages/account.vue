<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-8 offset-2">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="followers" label="Followers" />
            <q-tab name="following" label="Following" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="followers">
              <div
                v-for="(follower, index) in followers"
                :key="`follower-${index}`"
              >
                <div class="row">
                  <div class="col-1 row">
                    <div class="col-8 offset-2">
                      <img
                        src="images/blank-profile-picture.png"
                        alt="profile-image"
                        class="profile q-mb-sm"
                      />
                    </div>
                  </div>
                  <div class="col-9 q-pl-lg row">
                    <div class="col-12 row flex items-end">
                      <div class="text-h5">
                        {{ follower._fields[0].properties.username }}
                      </div>
                      <div class="q-ml-lg">Follows You</div>
                    </div>
                    <p>
                      {{ follower._fields[0].properties.biography }}
                    </p>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn
                      v-if="follower._fields[0].properties.isFollowing"
                      @click="
                        deleteMyFollowingList(follower._fields[0].identity.low)
                      "
                      outline
                      rounded
                      color="primary"
                      label="FOLLOWING"
                    />
                    <q-btn
                      v-else
                      @click="
                        addMyFollowingList(follower._fields[0].identity.low)
                      "
                      unelevated
                      rounded
                      color="primary"
                      label="FOLLOW"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="following">
              <div
                v-for="(following, index) in followings"
                :key="`following-${index}`"
              >
                <div class="row">
                  <div class="col-1 row">
                    <div class="col-8 offset-2">
                      <img
                        src="images/blank-profile-picture.png"
                        alt="profile-image"
                        class="profile q-mb-sm"
                      />
                    </div>
                  </div>
                  <div class="col-9 q-pl-lg row">
                    <div class="col-12 row flex items-end">
                      <div class="text-h5">
                        {{ following._fields[0].properties.username }}
                      </div>
                      <div
                        class="q-ml-lg"
                        v-if="following._fields[0].properties.isFollower"
                      >
                        Follows You
                      </div>
                    </div>
                    <p>
                      {{ following._fields[0].properties.biography }}
                    </p>
                  </div>
                  <div class="col-2 flex flex-center">
                    <q-btn
                      v-if="following._fields[0].properties.isFollowing"
                      @click="
                        deleteMyFollowingList(following._fields[0].identity.low)
                      "
                      outline
                      rounded
                      color="primary"
                      label="FOLLOWING"
                    />
                    <q-btn
                      v-else
                      @click="
                        addMyFollowingList(following._fields[0].identity.low)
                      "
                      unelevated
                      rounded
                      color="primary"
                      label="FOLLOW"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';

export default {
  setup() {
    const route = useRoute();
    const $store = useStore();
    const targetId = route.params.targetId;
    $store.dispatch('account/getFollowerList', targetId).catch(console.log);
    $store.dispatch('account/getFollowingList', targetId).catch(console.log);
    const addMyFollowingList = (targetId: string) =>
      $store.dispatch('account/addMyFollowingList', targetId);
    const deleteMyFollowingList = (targetId: string) =>
      $store.dispatch('account/deleteMyFollowingList', targetId);
    const followers = computed(() => $store.state.account.followers);
    const followings = computed(() => $store.state.account.followings);

    return {
      tab: ref('followers'),
      followers,
      followings,
      addMyFollowingList,
      deleteMyFollowingList,
    };
  },
};
</script>

<style scoped>
.profile {
  border-radius: 100%;
  width: 100%;
  height: auto;
  overflow: hidden;
}
</style>
