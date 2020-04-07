import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtag from "vue-gtag";

require('./services/repoManager');
require('./styles/main.scss');

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: "UA-106534263-1" },
  disableScriptLoad: process.env.NODE_ENV === 'production' ? false : true
}, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

