<template>
  <div id="app">
    <status-bar></status-bar>

    <button v-if="!mindsFolder && !vagrantInProgress" @click="mindsFolderSelect">Choose folder</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import StatusBar from './components/StatusBar';

export default {
  name: 'app',
  components: {
    StatusBar,
  },
  computed: {
    ...mapState([
      'mindsFolder',
      'vagrantInProgress',
    ]),
  },
  methods: {
    ...mapActions({
      'mindsFolderSelect': 'mindsFolder.select',
    }),
  },
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  line-height: 1.5;
}
</style>
