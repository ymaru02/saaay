<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image" />
    </div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/avatar.svg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 q-my-none text-weight-regular"></h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <q-input
              filled
              v-model="password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div class="row justify-around">
              <q-btn label="Sign in" type="submit" color="primary" />
              <q-btn label="Sign up" to="signup" color="warning" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Cookies } from 'quasar';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

export default {
  async created() {
    const $store = useStore();
    const $router = useRouter();
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      await $store
        .dispatch('signin/loginByAccessToken', accessToken)
        .catch(console.log);
      console.log(accessToken);
      await $router.push('profile');
    }
  },
  setup() {
    const email = ref(null);
    const password = ref(null);
    const name = ref(null);
    const age = ref(null);
    const $store = useStore();

    return {
      email,
      password,
      name,
      age,

      onReset() {
        email.value = null;
        password.value = null;
      },

      async onSubmit() {
        const user = {
          email: email.value,
          password: password.value,
        };
        await $store.dispatch('signin/authenticate', user).catch(console.log);
        console.log($store.state.signin.user.email);
        console.log(Cookies.get('access_token'));
      },
    };
  },
};
</script>
