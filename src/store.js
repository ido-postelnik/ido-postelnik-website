import Vue from 'vue'
import Vuex from 'vuex'

const DEFAULT_ACTIVE_WORK_FLOW_MODE = "PRODUCTION";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSideBarVisibile: true, //used only for tablet and mobile screens
    activeWorkFlowMode: DEFAULT_ACTIVE_WORK_FLOW_MODE
  },
  getters: {
  },
  mutations: {
    toggleSidebar(state) {
      state.isSideBarVisibile = !state.isSideBarVisibile;
    },
    updateWorkFlowMode(state, newMode) {
      state.activeWorkFlowMode = newMode;
    }
  },
  actions: {
  }
})
