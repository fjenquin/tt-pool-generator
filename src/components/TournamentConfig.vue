<template>
  <v-stepper v-model="currentStep" vertical>
    <v-stepper-step step="1" editable :complete="currentStep > 1">
      Nom du tournoi
      <small>{{ name }}</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-form ref="nameForm" v-model="nameValid">
        <v-text-field v-model="name" required :rules="nameRules"/>
      </v-form>
      <v-btn color="primary" @click.native="currentStep = 2">Suivant</v-btn>
      <v-btn flat @click.native="cancel()">Annuler</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" editable :complete="currentStep > 2">
      Sélection des joueurs
      <small v-if="currentStep >= 2">{{ playerIds.length }} joueurs sélectionnés</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <player-input @player-added="add($event)"/>
      <player-list :selectable="true" :players="players" :selectedIds="playerIds" @selection-changed="playerIds=$event" />
      <v-btn color="primary" @click.native="currentStep = 3">Suivant</v-btn>
      <v-btn flat @click.native="cancel()">Annuler</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" editable :complete="currentStep > 3">Configuration des poules</v-stepper-step>
    <v-stepper-content step="3">
      <pool-config :players="playerIdsPlayers" :poolConfig="poolConfig" @config-changed="poolConfig=$event"/>
      <pool-summary :players="playerIdsPlayers" :poolConfig="poolConfig" />
      <v-btn color="primary" @click.native="save()">Sauvegarder</v-btn>
      <v-btn color="secondary" @click.native="updatePools()">Mettre à jour</v-btn>
      <v-btn flat @click.native="cancel()">Annuler</v-btn>
    </v-stepper-content>
  </v-stepper>
  </template>

<script>
import PlayerInput from './PlayerInput.vue';
import PlayerList from './PlayerList.vue';
import PoolConfig from './PoolConfig.vue';
import PoolSummary from './PoolSummary.vue';

import { shufflePlayers } from '../services/PlayerService.js';

export default {
  components: {
    PlayerInput,
    PlayerList,
    PoolConfig,
    PoolSummary
  },
  props: ['players', 'addedPlayerId', 'tournamentConfig', 'tournaments'],
  data: function() {
    const nameRules = [
      v => !!v || 'Valeur obligatoire',
      v => v === this.tournamentConfig.name || !this.tournaments.some(t => t.name === v) || 'Nom déjà utilisé'
    ];
    if (this.tournamentConfig && this.tournamentConfig.poolConfig) {
      return {
        currentStep: 3,
        name: this.tournamentConfig.name,
        nameRules,
        nameValid: true,
        playerIds: this.tournamentConfig.playerIds,
        poolConfig: this.tournamentConfig.poolConfig
      };
    }
    return {
      currentStep: 0,
      name: '',
      nameRules,
      nameValid: false,
      playerIds: [],
      poolConfig: {
        nbPlayers: 5,
        splitBestPlayers: true,
        handicap: true
      }
    };
  },
  methods: {
    add: function(player) {
      this.$emit('player-added', player);
    },
    cancel: function() {
      this.notify('tournament-cancelled');
    },
    generatePools: function() {
      this.pools = shufflePlayers(
        this.playerIdsPlayers,
        this.poolConfig.nbPlayers,
        this.poolConfig.splitBestPlayers
      );
    },
    notify: function(eventName) {
      this.$emit(eventName, {
        name: this.name,
        playerIds: this.playerIds,
        poolConfig: this.poolConfig,
        pools: this.pools
      });
    },
    updatePools: function() {
      this.generatePools();
      this.notify('tournament-pools-updated');
    },
    save: function() {
      if (!this.pools) {
        this.generatePools();
      }
      this.notify('tournament-saved');
    }
  },
  watch: {
    addedPlayerId: function(val) {
      if (val) {
        this.playerIds.push(val);
      }
    }
  },
  computed: {
    playerIdsPlayers: function() {
      return this.players.filter(player => this.playerIds.includes(player.Id));
    }
  }
};
</script>

<style scoped>

</style>