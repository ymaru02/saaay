/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable
@typescript-eslint/no-unsafe-assignment */
<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar>
              <!-- 수정사항 -->
              <img
                src="images/blank-profile-picture.png"
                alt="profile-image"
                class="profile q-mb-sm"
              />-->
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ userName }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat icon="close" href="/#/main" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <q-icon name="img:images/logo.png" size="50px" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(follower, index) in follows"
              :key="`follower-${index}`"
              clickable
              v-ripple
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <!-- 수정사항 -->
                  <img
                    src="images/blank-profile-picture.png"
                    alt="profile-image"
                    class="profile q-mb-sm"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ follower._fields[0].properties.username }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <!-- <q-icon name="check" v-if="conversation.sent" /> -->
                  <!-- <q-icon name="not_interested" v-if="conversation.deleted" /> -->
                  <!-- {{ conversation.caption }} -->
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  <!-- {{ conversation.time }} -->
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-form class="full-width">
            <q-input
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="message"
              placeholder="Type a message"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" />
              </template>
            </q-input>
          </q-form>

          <q-btn round flat icon="mic" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, computed, watch } from 'vue';
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import { OpenVidu } from 'openvidu-browser';

export default defineComponent({
  name: 'WhatsappLayout',
  setup() {
    let OV = ref();
    let mainStreamManager = ref();
    let publisher = ref();
    let subscribers = ref();

    let mySessionId = ref('SessionA');
    let myUserName = ref(
      'Participant' + String(Math.floor(Math.random() * 100))
    );

    const $store = useStore();
    const follows = computed(() =>
      Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )
    );

    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const search = ref('');
    const message = ref('');
    const currentConversationIndex = ref(0);

    const userName = ref('');
    const currentConversation = computed(() => {
      return Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )[currentConversationIndex.value]._fields[0].properties.username;
    });

    const style = computed(() => ({
      height: ''.concat($q.screen.height, 'px'),
    }));

    // 수정사항
    //  팔로우 팔로워 합친 데이터 가져오기
    function setCurrentConversation(index) {
      currentConversationIndex.value = index | 0;

      // --- Get an OpenVidu object ---
      OV = new OpenVidu();

      // --- Init a session ---
      session = OV.value.initSession();

      // --- Specify the actions when events take place in the session ---

      // On every new Stream received...
      session.on('streamCreated', ({ stream }) => {
        const subscriber = session.subscribe(stream);
        subscribers.value.push(subscriber);
      });

      // On every Stream destroyed...
      session.on('streamDestroyed', ({ stream }) => {
        const index = subscribers.value.indexOf(stream.streamManager, 0);
        if (index >= 0) {
          subscribers.value.splice(index, 1);
        }
      });

      // On every asynchronous exception...
      session.on('exception', ({ exception }) => {
        console.warn(exception);
      });

      // --- Connect to the session with a valid user token ---

      // 'getToken' method is simulating what your server-side should do.
      // 'token' parameter should be retrieved and returned by your own backend
      getToken(mySessionId).then((token) => {
        this.session
          .connect(token, { clientData: myUserName })
          .then(() => {
            // --- Get your own camera stream with the desired properties ---

            let publisher = OV.value.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            mainStreamManager = publisher;
            publisher = publisher;

            // --- Publish your stream ---

            session.publish(publisher);
          })
          .catch((error) => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message
            );
          });
      });

      // window.addEventListener('beforeunload', leaveSession);
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    watch(currentConversationIndex, () => {
      userName.value = Object.assign(
        {},
        $store.state.account.followers,
        $store.state.account.followings
      )[currentConversationIndex.value]._fields[0].properties.username;
    });
    return {
      follows,
      userName,

      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,

      currentConversation,
      setCurrentConversation,
      style,

      toggleLeftDrawer,
    };
  },

  created() {
    const $store = useStore();
    $store.dispatch('account/getFollowerList', 1).catch(console.log);
    $store.dispatch('account/getFollowingList', 1).catch(console.log);
  },
});
</script>

<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: '';
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #eee;
  }

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 950px;
    border-radius: 5px;
  }

  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }

  .q-drawer--standard {
    .WAL__drawer-close {
      display: none;
    }
  }
}

@media (max-width: 850px) {
  .WAL {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
@media (min-width: 691px) {
  .WAL {
    &__drawer-open {
      display: none;
    }
  }
}
.conversation__summary {
  margin-top: 4px;
}
.conversation__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>
