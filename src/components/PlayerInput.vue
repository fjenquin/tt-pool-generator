<template>
  <v-form ref="form" v-model="valid" style="display:flex; flex-direction: row; justify-content:space-between; align-items: center;">
    <v-text-field label="Prénom" v-model="FirstName" required :rules="requiredRules"/>
    <v-text-field label="Nom" v-model="Name" required :rules="requiredRules"/>
    <v-select
      :items="rankings"
      v-model="Ranking"
      label="Classement"
      required
      :rules="requiredRules"
    ></v-select>

    <v-btn @click="add()">Ajouter</v-btn>
  </v-form>
</template>

<script>
import { getRankings } from '../services/PlayerService.js';

export default {
  data: function() {
    return {
      FirstName: '',
      Name: '',
      Ranking: '',
      rankings: getRankings(),
      valid: false,
      requiredRules: [
        v => !!v || 'Valeur obligatoire',
      ],
    };
  },
  methods: {
    add: function() {
      if (this.valid) {
        this.$emit('player-added', this.$data);
        this.FirstName = '';
        this.Name = '';
        this.Ranking = '';
        this.$ref.form.reset();
      }
    }
  }
};
</script>

<style scoped>

</style>