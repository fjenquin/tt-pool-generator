<template>
  <div>
    <mdc-fab icon="print" fixed @click="print()"></mdc-fab>
    <mdc-layout-grid v-if="selectedTournament">
      <mdc-layout-cell span="12" v-for="pool in selectedTournament.pools" :key="pool.poolNumber">
        <div class="page">
          <mdc-card style="width: 100%">
            <mdc-card-header :title="'Poule ' + pool.poolNumber" />
            <mdc-card-text>
              <player-list class="player-list" :players="pool.players" hideActions="true" shortHeaders="true" style="max-width: 600px;" />
              <pool-detail :players="pool.players" />
            </mdc-card-text>
          </mdc-card>
        </div>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import PlayerList from '@/components/player/PlayerList';

import PoolDetail from './PoolDetail';

export default {
  components: { PlayerList, PoolDetail },
  computed: mapState(['selectedTournament']),
  methods: {
    print: function() {
      window.print();
    }
  }
};
</script>

<style scoped>

</style>