<template>
  <div style="margin-left: 20px; margin-right: 20px;">
    <mdc-title>Gestion des joueurs</mdc-title>
    <player-input />
    <mdc-card>
      <player-list :players="players" searchable="true"/>
    </mdc-card>
  </div>
</template>

<script>
import PlayerInput from './PlayerInput';
import PlayerList from './PlayerList';

import { mapState } from 'vuex';

export default {
  components: {
    PlayerInput,
    PlayerList
  },
  computed: mapState(['players'])
};
</script>

<style scoped>

</style>