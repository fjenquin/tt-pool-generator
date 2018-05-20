<template>
  <div>
    <mdc-fab icon="refresh" fixed="" @click="refresh()"></mdc-fab>
    <mdc-fab v-if="refreshed" icon="save" fixed @click="save()" style="right: 0.5em" class="mdc-theme--primary-bg"></mdc-fab>
    <mdc-layout-grid v-if="selectedTournament" style="margin-bottom: 56px">
      <mdc-layout-cell span="4" v-for="pool in pools" :key="pool.poolNumber">
        <mdc-card >
          <mdc-card-header :title="'Poule ' + pool.poolNumber" />
          <player-list hideActions="true" :players="pool.players" :shortHeaders="true"/>
        </mdc-card>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PlayerList from '@/components/player/PlayerList';

import { ACTION_TOURNAMENT_ADD } from '@/constants/StoreConstants';

import { shufflePlayers } from '@/services/PlayerService.js';

export default {
  components: { PlayerList },
  computed: {
    pools: function() {
      if (this.newPools) {
        return this.newPools;
      }
      if (this.selectedTournament) {
        return this.selectedTournament.pools;
      }
      return null;
    },
    ...mapState(['players', 'selectedTournament']),
  },
  data: function() {
    return {
      refreshed: false,
      newPools: null
    };
  },
  methods: {
    refresh: function() {
      const poolPlayers = this.players.filter(p => this.selectedTournament.playerIds.includes(p.Id));
      this.refreshed = true;
      this.newPools = shufflePlayers(
        poolPlayers,
        this.selectedTournament.poolConfig.nbPlayers,
        this.selectedTournament.poolConfig.splitBestPlayers
      );
    },
    save: function() {
      this.refreshed = false;
      const newTournament = {
        ...this.selectedTournament,
        pools: this.newPools,
      };
      this.$store.commit(ACTION_TOURNAMENT_ADD, newTournament);
    }
  }
};
</script>

<style>
.table {
  margin-bottom: 0px;
}
</style>