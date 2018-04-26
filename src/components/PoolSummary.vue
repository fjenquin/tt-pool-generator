<template>
  <div>
    <v-data-table
      :items="poolComposition"
      :hide-actions="true"  
      :headers="headers"
    >
      <template slot="items" slot-scope="poolComposition">
        <td class="text-xs-right">{{ poolComposition.item.playersByPool }}</td>
        <td class="text-xs-right">{{ poolComposition.item.count }}</td>
      </template>
      <template slot="footer">
        <td><strong>Total poules</strong></td>
        <td class="text-xs-right"><strong>{{ poolCount }}</strong></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['players', 'poolConfig'],
  data: function() {
    return {
      headers: [
        { text: 'Nombre de joueurs', sortable: false },
        { text: 'Nombre de poules', sortable: false }
      ]
    };
  },
  computed: {
    poolCount: function() {
      return Math.ceil(this.players.length / this.poolConfig.nbPlayers);
    },
    poolComposition: function() {
      let minPlayersByPool = Math.floor(this.players.length / this.poolCount);
      let additionalPlayers =
        this.players.length - minPlayersByPool * this.poolCount;
      if (minPlayersByPool == this.nbPlayers) {
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