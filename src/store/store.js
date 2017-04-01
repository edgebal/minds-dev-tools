import Vue from 'vue';
import Vuex from 'vuex';
import { remote } from 'electron';
import { exec } from 'child_process';

Vue.use(Vuex);

const state = {
  // Minds
  mindsFolder: '',

  // Vagrant
  vagrantUp: false,
  vagrantInProgress: false,
};

const mutations = {
  ['mindsFolder.change'](state, folder) {
    state.mindsFolder = folder;
  },
  ['vagrantUp.change'](state, status) {
    state.vagrantUp = status;
  },
  ['vagrantInProgress.change'](state, status) {
    state.vagrantInProgress = status;
  },
}

const actions = {
  ['mindsFolder.load']({ commit, dispatch }) {
    const path = localStorage.getItem('mindsFolder');

    if (path) {
      commit('mindsFolder.change', path);
      dispatch('vagrantUp.check');
    }
  },
  ['mindsFolder.select']({ commit, dispatch }) {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function (filePaths) {
      if (!filePaths) {
        return;
      }

      const path = filePaths[0];

      localStorage.setItem('mindsFolder', path);

      commit('mindsFolder.change', path);
      dispatch('vagrantUp.check');
    });
  },
  ['vagrantUp.check']({ commit, state }) {
    if (state.vagrantInProgress) {
      return;
    }

    commit('vagrantInProgress.change', true);

    exec(`cd ${state.mindsFolder} && vagrant status --machine-readable`, (error, stdout, stderr) => {
      commit('vagrantInProgress.change', false);
      if (error) {
        console.error(error);
        return;
      }

      let output = {};

      stdout
        .split('\n')
        .map(item => item.trim())
        .filter(item => item)
        .map(item => item.split(','))
        .forEach(item => {
          output[item[2]] = item.slice(3).join(',');
        });

      let vagrantUp = state.vagrantUp;

      if (typeof output.state !== 'undefined') {
        vagrantUp = output.state == 'running';
      }

      if (state.vagrantUp !== vagrantUp) {
        commit('vagrantUp.change', true);
      }
    });
  }
}

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
});
