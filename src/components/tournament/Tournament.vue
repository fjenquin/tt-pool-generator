<template>
  <div>
    <mdc-tab-bar class="mdc-theme--secondary">
      <mdc-tab :to="'/tournament/' + tournamentName + '/config'" :active="selectedTabIdx === 0">Configuration</mdc-tab>
      <mdc-tab :to="'/tournament/' + tournamentName + '/overview'" :active="selectedTabIdx === 1">Aperçu</mdc-tab>
      <mdc-tab :to="'/tournament/' + tournamentName + '/details'" :active="selectedTabIdx === 2">Détails</mdc-tab>
    </mdc-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

import { ACTION_TOURNAMENT_SELECT } from '@/constants/StoreConstants';

export default {
  computed: {
    tournament: function() {
      return this.tournaments.find(t => t.name === this.tournamentName);
    },
    ...mapState(['tournaments'])
  },
  data: () => {
    return {
      selectedTabIdx: 0,
      tournamentName: null
    };
  },
  methods: {
    updateTabStatus: function(name, path) {
      const firstPart = '/tournament/' + name + '/';
      let idx;
      const overviewPath = firstPart + 'overview';
      const detailsPath = firstPart + 'details';
      if (path === overviewPath) {
        idx = 1;
      } else if (path === detailsPath) {
        idx = 2;
      } else {
        idx = 0;
      }
      const tabBar = document.getElementsByClassName('mdc-tab-bar')[0];
      const tabs = tabBar.getElementsByClassName('mdc-tab');
      Vue.nextTick(function() {
        tabs[idx].click();
      });
    }
  },
  watch: {
    $route: function(to, from) {
      this.updateTabStatus(this.tournamentName, to.path);
    },
    '$route.params.name': function(newVal) {
      this.tournamentName = newVal;
    },
    tournament: function(tournament) {
      this.$store.commit(ACTION_TOURNAMENT_SELECT, tournament);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.tournamentName = to.params.name;
      vm.updateTabStatus(vm.tournamentName, to.path);
    });
  }
};
</script>

<style scoped>
</style>