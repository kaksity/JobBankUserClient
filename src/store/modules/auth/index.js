import API from '@/api';
import * as types from './types';

const state = {
  token: localStorage.getItem('token') || null,
  me: {}
};

const getters = {};

const actions = {
  Login({ commit, dispatch }, params) {
    return API.Login(params).then((Value) => {

      commit('LoginMutation', Value);
      const token = Value.data.token;
      localStorage.setItem('token', token);
      //dispatch('readMe', { token });
      return Value;
    }, res => Promise.reject(res));
  },
  Register({ commit, dispatch }, params) {
    return API.Register(params).then((value) => {
      return value;
    }, res => Promise.reject(res));
  },
  // readMe({ commit }, params) {
  //   return API.readMe(params).then((value) => {
  //     commit(types.READ_ME, { value });
  //   }, res => Promise.reject(res));
  // },
  logout({ commit }) {
    commit('LogOutMutation');
  },
};

const mutations = {
  LoginMutation(state, Value) {
    state.token = Value.data.token;
  },
  LogOutMutation(state) {
    localStorage.removeItem('token');
    state.token = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
