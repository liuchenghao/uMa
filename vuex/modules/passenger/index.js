/* eslint-disable-next-line no-param-reassign */
import {
  SET_CUR_NAV_INDEX
} from '@/vuex/types';

const state = {
  categories: [],
};

const actions = {
  setCategories(context, payload) {
    context.commit(SET_CUR_NAV_INDEX, payload);
  },
};

const mutations = {
  [SET_CUR_NAV_INDEX](state, payload) {
    if (payload) state.categories = payload;
  },
};

const getters = {
  get: state => {
    return data => {
      return state[data];
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
