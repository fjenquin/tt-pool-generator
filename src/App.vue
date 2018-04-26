<template>
  <v-app>
    <v-navigation-drawer id="navigation-drawer"
      v-model="drawer"
      app
      fixed
      width="600"
      style="padding-bottom: 0px;">
      <tournament-list @tournament-selected="tournament=$event"/>
    </v-navigation-drawer>
    <v-toolbar color="secondary" dark fixed app id="navigation-toolbar">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TT<span v-if="tournament"> - {{ tournament.name }}</span></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <div id="app">
          <template v-if="tournament">
            <v-layout row id="detailedSwitch">
              <v-switch label="Vue détaillée" v-model="detailedView"/>
              <v-flex/>
              <v-btn @click.native="print()">Imprimer</v-btn>
            </v-layout>
            <template v-if="detailedView">
              <v-layout column v-if='tournament'>
                <v-flex xs12 v-for="(pool, index) in tournament.pools" :key="pool.poolNumber" pa-1>
                  <div class="page">
                    <v-card v-if="poolNumber === -1 || poolNumber === index" >
                      <v-card-title>
                        <h4>Poule {{ pool.poolNumber }}</h4>
                      </v-card-title>
                      <v-layout row>
                        <player-list class="player-list" :players="pool.players" :hideActions="true" :numbered="true"/>
                        <v-flex />
                      </v-layout>
                      <br/> 
                      <v-divider pa-1 ma-1/>
                      <pool-detail :players="pool.players" />
                    </v-card>
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-else>
              <v-layout wrap v-if='tournament'>
                <v-flex xs12 md6 xl4 v-for="pool in tournament.pools" :key="pool.poolNumber" pa-1>
                  <v-card >
                    <v-card-title>
                      <h4>Poule {{ pool.poolNumber }}</h4>
                    </v-card-title>
                    <player-list :players="pool.players" :hideActions="true"/>
                  </v-card>
                </v-flex>
              </v-layout>
            </template>
          </template>
          <span v-else>
            Veuillez sélectionner ou créer un tournoi.
          </span>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PlayerList from './components/PlayerList.vue';
import PoolDetail from './components/PoolDetail.vue';
import TournamentConfig from './components/TournamentConfig.vue';
import TournamentList from './components/TournamentList.vue';

import { getPlayers } from './services/PlayerService.js';

export default {
  name: 'App',
  components: {
    PlayerList,
    PoolDetail,
    TournamentConfig,
    TournamentList
  },
  data: function() {
    return {
      detailedView: false,
      drawer: true,
      tournament: null,
      players: getPlayers(),
      poolNumber: -1,
    };
  },
  methods: {
    print: function() {
     window.print();
    }
  }
};
</script>
<style>

</style>