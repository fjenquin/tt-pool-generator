<template>
  <span>{{ handicap }}</span>
</template>

<script>

import { getRankings } from '../services/PlayerService.js';

const rankings = getRankings();

export default {
  props: ['player1Ranking', 'player2Ranking'],
  computed: {
    handicap: function() {
      let val =
        rankings.indexOf(this.player2Ranking) - rankings.indexOf(this.player1Ranking);
      let multiplier = 1;
      if (val < 0) {
        multiplier = -1;
      }
      val = Math.floor((val + multiplier) / 2);
      if (val * multiplier > 8) {
        val = multiplier * 8;
      }
      return val;
    }
  }
};
</script>

<style scoped>

</style>