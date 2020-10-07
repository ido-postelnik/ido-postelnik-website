import Vue from 'vue'
import Vuex from 'vuex'

const DEFAULT_ACTIVE_WORK_FLOW_MODE = "PRODUCTION";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSideBarVisibile: false, //used only for tablet and mobile screens
    activeWorkFlowMode: DEFAULT_ACTIVE_WORK_FLOW_MODE
  },
  getters: {
  },
  mutations: {
    toggleSidebar(state, action) {
      if (action != null) {
        switch (action){
          case 'open': {
            state.isSideBarVisibile = true;
          }
          case 'close': {
            state.isSideBarVisibile = false;
          }
          default: {
            state.isSideBarVisibile = false;
          }
        }
      } else {
        state.isSideBarVisibile = !state.isSideBarVisibile;
      }
    },
    updateWorkFlowMode(state, newMode) {
      state.activeWorkFlowMode = newMode;
    }
  },
  actions: {
  }
})
