<template>
  <div style="display: flex; flex-direction: column;">
    <mdc-select v-model="nbPlayers" label="Nombre de joueurs par poule">
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>/</option>
    </mdc-select>
    <mdc-checkbox label="Séparer les joueurs de force similaire" v-model="splitBestPlayers"/>
    <mdc-checkbox label="Handicap" v-model="handicap"/>
  </div>
</template>

<script>
const CONFIG_CHANGED = 'config-changed';

export default {
  props: ['poolConfig'],
  data: function() {
    return {
      handicap: false,
      nbPlayers: '' + 5,
      splitBestPlayers: false
    };
  },
  created: function() {
    this.$emit(CONFIG_CHANGED, {
      handicap: this.handicap,
      nbPlayers: Number(this.nbPlayers),
      splitBestPlayers: this.splitBestPlayers
    });
  },
  watch: {
    nbPlayers: function(val) {
      this.$emit(CONFIG_CHANGED, {
        handicap: this.handicap,
        nbPlayers: Number(val),
        splitBestPlayers: this.splitBestPlayers
      });
    },
    poolConfig: function(val) {
      this.handicap = val.handicap;
      this.nbPlayers = '' + val.nbPlayers;
      this.splitBestPlayers = val.splitBestPlayers;
    },
    splitBestPlayers: function(val) {
      this.$emit(CONFIG_CHANGED, {
        handicap: this.handicap,
        nbPlayers: Number(this.nbPlayers),
        splitBestPlayers: val
      });
    },
    handicap: function(val) {
      this.$emit(CONFIG_CHANGED, {
        handicap: val,
        nbPlayers: Number(this.nbPlayers),
        splitBestPlayers: this.splitBestPlayers
      });
    }
  }
};
</script>

<style scoped>
</style>