<template>
  <div>
    <v-card>
      <v-btn
        color="primary  "
        small
        fixed
        top
        right
        fab
        @click.native="create()"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card-title class="title">Tournois</v-card-title>
      <v-expansion-panel>
        <v-expansion-panel-content 
          v-for="(tournament, index) in tournaments" 
          v-model="panelStatus[index]"
          :key="tournament.name" 
          v-on:input="select($event, tournament)">
          <div slot="header">
          {{ tournament.name }}
          <v-icon color="primary" @click.stop="dialog.show=true; dialog.name=tournament.name; dialog.object = tournament" >delete</v-icon>
          </div>
          <tournament-config 
            :players="players" 
            :tournamentConfig="tournament"
            :tournaments="tournaments" 
            :addedPlayerId="addedPlayerId"
            @player-added="add($event)"
            @tournament-cancelled="cancel()"
            @tournament-pools-updated="update($event)"
            @tournament-saved="save($event)"
            />
        </v-expansion-panel-content>
        <v-expansion-panel-content v-if="newTournament" value="true">
          <div slot="header">{{ tournament.name }}</div>
          <tournament-config 
            :players="players"
            :addedPlayerId="addedPlayerId"
            :tournamentConfig="tournament"
            :tournaments="tournaments"
            @player-added="add($event)"
            @tournament-cancelled="cancel()"
            @tournament-pools-updated="update($event)"
            @tournament-saved="save($event)"
            />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <delete-dialog :dialog="dialog" @delete-confirmed="confirmDelete()" />
  </div>
</template>

<script>
import DeleteDialog from './DeleteDialog.vue';
import TournamentConfig from './TournamentConfig.vue';

import { addPlayer, getPlayers } from '../services/PlayerService.js';

import {
  addTournament,
  cloneTournament,
  deleteTournament,
  getTournaments,
  replaceTournament
} from '../services/TournamentService.js';

export default {
  components: {
    DeleteDialog,
    TournamentConfig
  },
  data: function() {
    const tournaments = getTournaments();
    return {
      addedPlayerId: null,
      dialog: {
        object: null,
        show: false,
        tournamentName: ''
      },
      editedTournament: null,
      originalTournament: null,
      newTournament: false,
      panelStatus: tournaments.map(() => false),
      players: getPlayers(),
      tournament: null,
      tournaments,
      value: null
    };
  },
  methods: {
    create: function() {
      this.newTournament = true;
      this.originalTournament = null;
      this.panelStatus = this.panelStatus.map(() => false);
      console.log(this.panelStatus);
      this.tournament = {
        name: '',
        playerIds: []
      };
    },
    confirmDelete: function() {
      deleteTournament(this.dialog.object);
      this.tournaments = getTournaments();
    },
    add: function(player) {
      const newId = addPlayer(player.Name, player.FirstName, player.Ranking);
      this.players = getPlayers();
      this.addedPlayerId = newId;
    },
    select: function(selected, tournament) {
      if (this.newTournament) {
        return;
      }
      this.newTournament = false;
      if (selected) {
        this.originalTournament = tournament;
        this.tournament = cloneTournament(tournament);
        this.$emit('tournament-selected', this.tournament);
      }
    },
    save: function(tournament) {
      if (this.originalTournament) {
        replaceTournament(this.originalTournament, tournament);
      } else {
        addTournament(tournament);
      }
      this.tournaments = getTournaments();
      this.update(tournament);
      this.newTournament = false;
      this.originalTournament = tournament;
      this.tournament = cloneTournament(tournament);
      this.$emit('tournaments-updated');
    },
    update: function(tournament) {
      this.$emit('tournament-selected', tournament);
      this.$emit('tournaments-updated');
    },
    cancel: function() {
      if (this.originalTournament) {
        this.tournament = cloneTournament(this.originalTournament);
      } else {
        this.newTournament = false;
      }
      this.update(this.tournament);
    },
    log: function(any) {
      console.log(any);
    }
  },
  watch: {
    value: function(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>

</style>