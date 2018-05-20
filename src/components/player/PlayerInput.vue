<template>
  <div v-if="!reset">
    <div style="display:flex; flex-direction: row; width: 100%; align-items: flex-start">
      <mdc-textfield ref="firstNameInput" style="flex: 1 1 auto" type="text" label="Prénom" v-model="FirstName" required
        helptext="Champ obligatoire" helptext-validation />
      <mdc-textfield ref="nameInput" style="flex: 1 1 auto" label="Nom" v-model="Name" required
        helptext="Champ obligatoire" helptext-validation />
      <mdc-select style="flex: 1 1 auto; margin-top:12px;"  v-model="Ranking" label="Classement" required>
        <option v-for="ranking in rankings" :key="ranking">{{ ranking }}</option>
      </mdc-select>
      <mdc-button style="flex: 0 0 auto; margin-top: 26px" class="mdc-theme--secondary-bg" raised @click="add();">Ajouter</mdc-button>
    </div>
    <mdc-text v-if="additionRequested && rankingMissing" class="text-error" style="margin-bottom: 14px;">Veuillez remplir le classement.</mdc-text>
    <mdc-text v-if="additionRequested && alreadyPresent" class="text-error" style="margin-bottom: 14px;">Joueur déjà présent dans le liste</mdc-text>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import * as accents from 'remove-accents';

import { ACTION_PLAYER_ADD } from '@/constants/StoreConstants';

import { getRankings } from '@/services/PlayerService.js';

export default {
  computed: mapState(['players']),
  data: function() {
    return {
      reset: false,
      additionRequested: false,
      alreadyPresent: false,
      rankingMissing: true,
      FirstName: '',
      Name: '',
      Ranking: '',
      rankings: getRankings(),
      valid: false,
      requiredRules: [v => !!v || 'Valeur obligatoire']
    };
  },
  methods: {
    add: function() {
      this.additionRequested = true;
      this.$refs.firstNameInput.focus();
      this.$refs.firstNameInput.blur();
      this.$refs.nameInput.focus();
      this.$refs.nameInput.blur();

      if (this.FirstName && this.Name && this.Ranking && !this.alreadyPresent) {
        this.$store.commit(ACTION_PLAYER_ADD, {
          firstName: this.FirstName,
          name: this.Name,
          ranking: this.Ranking,
        });
        this.FirstName = '';
        this.Name = '';
        this.Ranking = '';
        this.additionRequested = false;
        this.reset = true;
        Vue.nextTick(() => {
          this.reset = false;
        });
      }
    },
    isInList: function(players, firstName, lastName) {
      return players.some(p => {
        return (
          this.normalize(p.Name) === this.normalize(lastName) &&
          this.normalize(p.FirstName) === this.normalize(firstName)
        );
      });
    },
    normalize: function(val) {
      return accents
        .remove(val)
        .toLowerCase()
        .trim();
    }
  },
  watch: {
    FirstName: function(val) {
      this.alreadyPresent = this.isInList(this.players, val, this.Name);
      console.log('alreadyPresent', this.alreadyPresent);
    },
    Name: function(val) {
      this.alreadyPresent = this.isInList(this.players, this.FirstName, val);
      console.log('alreadyPresent', this.alreadyPresent);
    },
    Ranking: function(val) {
      this.rankingMissing = val === null;
    }
  }
};
</script>

<style scoped>

</style>