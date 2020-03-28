import Vue from 'vue'
import Vuex from 'vuex'

const DEFAULT_ACTIVE_WORK_FLOW_MODE = "PRODUCTION";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeWorkFlowMode: DEFAULT_ACTIVE_WORK_FLOW_MODE
  },
  getters: {
  },
  mutations: {
    updateWorkFlowMode(state, newMode) {
      state.activeWorkFlowMode = newMode;
    }
  },
  actions: {
  }
})
