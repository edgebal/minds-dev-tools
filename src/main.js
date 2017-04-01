import Vue from 'vue'
import App from './App'

import { store } from './store/store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  mounted() {
    this.$store.dispatch('mindsFolder.load');
  }
});
