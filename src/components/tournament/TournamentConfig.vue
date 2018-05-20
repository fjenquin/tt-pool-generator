<template>
  <div>
    <mdc-layout-grid>
      <mdc-layout-cell desktop="6" tablet="6" span="6" phone="12">
        <mdc-textfield fullwidth type="text" label="Nom" size="40"
          :helptext="nameError" helptext-validation
          :valid="nameError === null" v-model="name" />

        <pool-config :players="selectedPlayers" :poolConfig="poolConfig" @config-changed="poolConfig=$event"/>

        <pool-summary :players="selectedPlayers" :poolConfig="poolConfig" />

        <div style="display: flex; flex-direction: row;">
          <mdc-button raised class="mdc-theme--secondary-bg" @click="save()">
            <i class="material-icons mdc-button__icon">check</i>
            Sauvegarder
          </mdc-button>
          <mdc-button @click="cancel()">Annuler</mdc-button>
        </div>
      </mdc-layout-cell>
      <mdc-layout-cell desktop="6" tablet="6" span="6" phone="12">
        <mdc-card style="margin-bottom= -2em">
          <player-list selectable="true" searchable="true" shortHeaders="true" 
            :players="players" :selectedIds="playerIds" @selection-changed="playerIds=$event" />
        </mdc-card>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import {
  ACTION_TOURNAMENT_ADD,
  ACTION_TOURNAMENT_SELECT
} from '@/constants/StoreConstants';

import PlayerInput from '@/components/player/PlayerInput.vue';
import PlayerList from '@/components/player/PlayerList.vue';

import { shufflePlayers } from '@/services/PlayerService.js';

import PoolConfig from './PoolConfig.vue';
import PoolSummary from './PoolSummary.vue';

export default {
  components: {
    PlayerInput,
    PlayerList,
    PoolConfig,
    PoolSummary
  },
  computed: {
    selectedPlayers: function() {
      return this.players.filter(player => this.playerIds.includes(player.Id));
    },
    ...mapState(['players', 'tournaments', 'selectedTournament'])
  },
  data: () => {
    return {
      name: '',
      nameError: null,
      playerIds: [],
      poolConfig: null
    };
  },
  methods: {
    cancel: function() {
      this.$router.push('/');
    },
    save: function() {
      if (!this.name) {
        this.nameError = 'Valeur obligatoire';
      }
      if (this.nameError !== null) {
        return;
      }
      const newTournament = {
        name: this.name,
        playerIds: this.playerIds,
        pools: shufflePlayers(
          this.selectedPlayers,
          this.poolConfig.nbPlayers,
          this.poolConfig.splitBestPlayers
        ),
        poolConfig: this.poolConfig
      };
      this.$store.commit(ACTION_TOURNAMENT_ADD, newTournament);
      this.$store.commit(ACTION_TOURNAMENT_SELECT, newTournament);
      this.$router.push('/tournament/' + newTournament.name + '/overview');
    }
  },
  mounted: function() {
    if (this.selectedTournament) {
      this.name = this.selectedTournament.name;
      this.playerIds = this.selectedTournament.playerIds;
      this.poolConfig = this.selectedTournament.poolConfig;
    }
  },
  watch: {
    name: function(val) {
      if (!val) {
        this.nameError = 'Valeur obligatoire';
      } else if (
        this.selectedTournament &&
        this.selectedTournament.name === val
      ) {
        this.nameError = null;
      } else if (this.tournaments.some(t => t.name === val)) {
        this.nameError = 'Nom déjà utilisé';
      } else {
        this.nameError = null;
      }
    },
    selectedTournament: function(val) {
      console.log('selectedTournament watch', val);
      this.name = val.name;
      this.playerIds = val.playerIds;
      this.poolConfig = {
        ...val.poolConfig
      };
    }
  }
};
</script>

<style scoped>
</style>