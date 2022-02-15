import { AxiosResponse } from 'axios';
import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SigninStateInterface } from './state';
import { Notify } from 'quasar';
import { User } from './user.model';

const actions: ActionTree<SigninStateInterface, StateInterface> = {
  authenticate({ commit }, user: { email: string; password: string }) {
    api
      .post('/user/login', user)
      .then((response: AxiosResponse<{ access_token: string }>) => {
        Cookies.set('access_token', response.data.access_token, {
          expires: '1d',
        });
      })
      .then(() => api.post('/user/email', user))
      .then((response) => {
        commit('authenticate', response.data);
      })
      .catch(() => {
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Check Your Email or Password',
        });
      });
  },

  loginByAccessToken({ commit }, accessToken: string) {
    api
      .get('/user/verify', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('response :', response.data);
        commit('authenticate', response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateProfile({ commit }, user: User) {
    console.log('update profile');
    const accessToken = Cookies.get('access_token');
    if (accessToken)
      api
        .put('user/profile', user, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('response :', response.data);
          commit('authenticate', response.data);
        })
        .catch(console.log);
  },
};

export default actions;
