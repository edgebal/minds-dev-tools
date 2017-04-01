<template>
  <div class="status-bar">
    <a v-if="mindsFolder" v-show="!vagrantInProgress">Vagrant: <span>{{ vagrantUp }}</span></a>
    <a v-if="vagrantInProgress">?</a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'status-bar',
  computed: {
    ...mapState([
      'mindsFolder',
      'vagrantUp',
      'vagrantInProgress',
    ]),
  },
}
</script>

<style scoped>
a {
  font-weight: 300;
  display: inline-block;
  padding: 8px;
  border: 1px solid #eeeeee;
}

span {
  color: red;
}
</style>
