<template>
  <div>
    <table class="table table-condensed table-bordered matches-list">
      <thead>
        <tr>
          <th colspan="4">Contre</th>
          <th colspan="5" class="bordered-thick">Score</th>
          <th class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }">
            {{ index + 1 }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="match of matches" :key="match.idx1 + '-' + match.idx2">
          <td class="w30">{{ match.idx1 + 1 }}-{{ match.idx2 +1 }}</td>
          <td class="bordered">{{ players[match.idx1].FirstName }} {{ players[match.idx1].Name }}</td>
          <td class="bordered">{{ players[match.idx2].FirstName }} {{ players[match.idx2].Name }}</td>
          <td class="w30 bordered text-xs-center">(<handicap :player1Ranking="players[match.idx1].Ranking" :player2Ranking="players[match.idx2].Ranking" />)</td>
          <td class="bordered-thick score"></td>
          <td class="bordered score"></td>
          <td class="bordered score"></td>
          <td class="bordered score"></td>
          <td class="bordered score"></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id" 
            v-bind:class="{ 'bordered-thick' : index ===0, bordered : index !==0, greyed : index !== match.idx1 && index !== match.idx2 }">
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="9" class="text-right"><strong>Total victoires</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
        <tr>
          <td colspan="9" class="text-right"><strong>Sets gagnés</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
        <tr>
          <td colspan="9" class="text-right"><strong>Sets perdus</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
       <tr>
          <td colspan="9" class="text-right"><strong>Classement</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
      </tfoot>
    </table>
    <br/>
    <table class="table table-bordered table-condensed pool-ranking" style="max-width: 400px">
      <thead>
        <tr>
          <th></th>
          <th>Classement</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="player.Id">
          <td>{{ index + 1}}</td>
          <td style="width: 400px"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getMatches } from '@/services/PoolService';

import Handicap from '@/components/Handicap';

export default {
  components: {
    Handicap
  },
  props: ['players'],
  data: function() {
    return {
      headers: []
    };
  },
  computed: {
    matches: function() {
      return getMatches(this.players.length);
    }
  }
};
</script>

<style scoped>
.bordered {
  border-left: 1px solid lightgrey;
}
.bordered-thick {
  border-left: 2px solid lightgrey;
}
.greyed {
  background-color: lightgrey;
}
.small-column {
  min-width: 15px;
  max-width: 20px;
  /* padding: 0px !important;
  margin: 0px !important; */
}
.score {
  min-width: 30px;
  max-width: 40px;
  /* padding: 0px !important;
  margin: 0px !important; */
}
.w30 {
  text-align: center;
  width: 30px;
  /* padding: 0px !important;
  margin: 0px !important; */
}
td {
  padding: 4px !important;
}
th {
  padding: 4px !important;
}
</style>