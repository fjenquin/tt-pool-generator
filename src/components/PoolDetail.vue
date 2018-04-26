<template>
  <div>
    <v-data-table
      :items="matches"
      hide-actions
    >
      <template slot="headers" slot-scope="headers">
        <tr>
          <th colspan="4">Contre</th>
          <th colspan="5" class="bordered-thick">Score</th>
          <th class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }">
            {{ index + 1 }}
          </th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <td class="w30">{{ props.item.idx1 + 1 }}-{{ props.item.idx2 +1 }}</td>
        <td class="bordered">{{ players[props.item.idx1].FirstName }} {{ players[props.item.idx1].Name }}</td>
        <td class="bordered">{{ players[props.item.idx2].FirstName }} {{ players[props.item.idx2].Name }}</td>
        <td class="w30 bordered text-xs-center">(<handicap :player1Ranking="players[props.item.idx1].Ranking" :player2Ranking="players[props.item.idx2].Ranking" />)</td>
        <td class="bordered-thick score"></td>
        <td class="bordered score"></td>
        <td class="bordered score"></td>
        <td class="bordered score"></td>
        <td class="bordered score"></td>
        <td class="small-column" v-for="(player, index) in players" :key="player.id" 
          v-bind:class="{ 'bordered-thick' : index ===0, bordered : index !==0, greyed : index !== props.item.idx1 && index !== props.item.idx2 }">
        </td>
      </template>

      <template slot="footer">
        <tr>
          <td colspan="9" class="text-xs-right"><strong>Total victoires</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
        <tr>
          <td colspan="9" class="text-xs-right"><strong>Sets gagnés</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
        <tr>
          <td colspan="9" class="text-xs-right"><strong>Sets perdus</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
       <tr>
          <td colspan="9" class="text-xs-right"><strong>Classement</strong></td>
          <td class="small-column" v-for="(player, index) in players" :key="player.id"
            v-bind:class="{ 'bordered-thick' : index === 0, bordered : index !== 0 }"></td>
        </tr>
      </template>
    </v-data-table>
    <v-divider/>
    <br/>
    <v-layout row>
      <v-data-table
        class="pool-ranking"
        :items="players"
        hide-actions
      >
        <template slot="headers" slot-scope="headers">
          <tr>
            <th></th>
            <th>Classement</th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <td>{{ props.index + 1}}</td>
          <td style="width: 400px"></td>
        </template>
      </v-data-table>
      <v-flex />
    </v-layout>
  </div>
</template>

<script>
import Handicap from './Handicap.vue';

import { getMatches } from '../services/PoolService.js';
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
  min-width: 20px;
  max-width: 30px;
  padding: 0px !important;
  margin: 0px !important;
}
.score {
  min-width: 30px;
  max-width: 40px;
  padding: 0px !important;
  margin: 0px !important;
}
.w30 {
  text-align: center;
  width: 30px;
  padding: 0px !important;
  margin: 0px !important;
}
</style>