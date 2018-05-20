<template>
  <div>
    <table class="table table-bordered table-condensed" mdc-typography>
      <thead>
        <tr>
          <th class="text-center">Joueurs par poule</th>
          <th class="text-center">Nombre de poules</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poolConfig in poolComposition" :key="poolConfig.playersByPool" v-if="poolConfig.count > 0">
          <td class="text-right">{{ poolConfig.playersByPool }}</td>
          <td class="text-right">{{ poolConfig.count }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-right"><strong>Total poules</strong></td>
          <td class="text-right"><strong>{{ poolCount }}</strong></td>
        </tr>
        <tr>
          <td class="text-right"><strong>Total joueurs</strong></td>
          <td class="text-right"><strong>{{ this.players.length }}</strong></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: ['players', 'poolConfig'],
  computed: {
    poolCount: function() {
      if (this.poolConfig) {
        return Math.ceil(this.players.length / this.poolConfig.nbPlayers);
      } else {
        return 0;
      }
    },
    poolComposition: function() {
      let minPlayersByPool = Math.floor(this.players.length / this.poolCount);
      let additionalPlayers =
        this.players.length - minPlayersByPool * this.poolCount;
      if (minPlayersByPool === this.nbPlayers) {
        return [
          {
            playersByPool: this.nbPlayers,
            count: this.poolCount
          }
        ];
      } else {
        const res = [
          {
            playersByPool: minPlayersByPool,
            count: this.poolCount - additionalPlayers
          }
        ];
        if (additionalPlayers) {
          res.push({
            playersByPool: minPlayersByPool + 1,
            count: additionalPlayers
          });
        }
        return res;
      }
    }
  }
};
</script>

<style scoped>

</style>