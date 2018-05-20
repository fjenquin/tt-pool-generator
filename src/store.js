import Vue from 'vue';
import Vuex from 'vuex';

import { addPlayer, getPlayers } from '@/services/PlayerService';
import { addTournament, getTournaments, deleteTournament, replaceTournament } from '@/services/TournamentService';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    players: getPlayers(),
    selectedTournament: null,
    tournaments: getTournaments(),
  },
  mutations: {
    addPlayer(state, player) {
      addPlayer(player.name, player.firstName, player.ranking);
      state.players = getPlayers();
    },
    addTournament(state, tournament) {
      if (state.selectedTournament) {
        replaceTournament(state.selectedTournament, tournament);
      } else {
        addTournament(tournament);
      }
      state.tournaments = getTournaments();
    },
    deleteTournament(state, tournament) {
      deleteTournament(tournament);
      state.tournaments = getTournaments();
    },
    selectTournament(state, tournament) {
      state.selectedTournament = tournament;
    }
  }
});
