<template>
  <div>
    <v-select 
      label="Nombre de joueurs par poule"
      :items="[3, 4, 5, 6, 7, 8]"
      v-model="nbPlayers"
    />
    <v-checkbox hide-details color="primary" label="Séparer les joueurs de force similaire" v-model="splitBestPlayers"/>
    <v-checkbox hide-details color="primary" label="Handicap" v-model="handicap"/>
  </div>
</template>

<script>
const CONFIG_CHANGED = 'config-changed';

export default {
  props: ['players', 'poolConfig'],
  data: function() {
    return {
      handicap: this.poolConfig.handicap,
      nbPlayers: this.poolConfig.nbPlayers,
      splitBestPlayers: this.poolConfig.splitBestPlayers
    };
  },
  created: function() {
    this.$emit(CONFIG_CHANGED, {
      handicap: this.handicap,
      nbPlayers: this.nbPlayers,
      splitBestPlayers: this.splitBestPlayers
    });
  },
  watch: {
    nbPlayers: function(val) {
      this.$emit(CONFIG_CHANGED, {
        nbPlayers: val,
        splitBestPlayers: this.splitBestPlayers,
        handicap: this.handicap
      });
    },
    splitBestPlayers: function(val) {
      this.$emit(CONFIG_CHANGED, {
        nbPlayers: this.nbPlayers,
        splitBestPlayers: val,
        handicap: this.handicap
      });
    },
    handicap: function(val) {
      this.$emit(CONFIG_CHANGED, {
        nbPlayers: this.nbPlayers,
        splitBestPlayers: this.splitBestPlayers,
        handicap: val
      });
    }
  }
};
</script>

<style scoped>

</style>