/* eslint-disable-next-line no-param-reassign */
import * as types from '../types';

// state
const state = {
  curCity: '',
  curNavIndex: 0,
  startPlace: '出发地', //出发地
  startFormattedPlace: '', //更具人性化的描述的出发地
  startPosition: [],//包含startLatitude和startLongitude
};

// mutations
const mutations = {
  [types.SET_CUR_NAV_INDEX](state, index){
    console.info(index, "--------")
    state.curNavIndex = index
  },
  [types.SET_PHONE](state, phone){
    state.phone = phone
  },
  [types.SET_START_PLACE](state, startPlace){
    state.startPlace = startPlace
  },
  [types.SET_FORMATTED_START_PLACE](state, startFormattedPlace){
    state.startFormattedPlace = startFormattedPlace
  },
  [types.SET_DESTINATION](state, destination){
    state.destination = destination
  },
  [types.SET_START_POSITION](state, startPosition){
    state.startPosition = startPosition
  },
  [types.SET_END_POSITION](state, endPosition){
    state.endPosition = endPosition
  },
  [types.SET_CUR_CITY](state, curCity){
    state.curCity = curCity
  },
  [types.SET_DRIVER](state, driver){
    state.driver = driver
  },
  [types.SET_COST](state, cost){
    state.cost = cost
  }
};
// actions
const actions = {
  [types.SET_CUR_CITY](context, params) {
    console.info("======___=====")
    context.commit(types.SET_CUR_CITY, params);
  },
  [types.SET_CUR_NAV_INDEX](context, params){
    context.commit(types.SET_CUR_NAV_INDEX, params);
  },
  [types.SET_PHONE](context, params){
    context.commit(types.SET_PHONE, params);
  },
  [types.SET_START_PLACE](context, params){
    context.commit(types.SET_START_PLACE, params);
  },
  [types.SET_FORMATTED_START_PLACE](context, params){
    context.commit(types.SET_FORMATTED_START_PLACE, params);
  },
  [types.SET_DESTINATION](context, params){
    context.commit(types.SET_DESTINATION, params);
  },
  [types.SET_START_POSITION](context, params){
    context.commit(types.SET_START_POSITION, params);
  },
  [types.SET_END_POSITION](context, params){
    context.commit(types.SET_END_POSITION, params);
  },
  [types.SET_DRIVER](context, params){
    context.commit(types.SET_DRIVER, params);
  },
  [types.SET_COST](context, params){
    context.commit(types.SET_COST, params);
  }
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
