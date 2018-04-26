<template>
  <v-dialog v-model="dialog.show" max-width="500px">
    <v-card>
      <v-card-title>
        <span>Supprimer {{ dialog.name }}</span>
      </v-card-title>
      <v-card-text>
        Vous allez supprimer {{ dialog.name}}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.stop="dialog.show=false;$emit('delete-confirmed')">Confirmer</v-btn>
        <v-btn flat @click.stop="dialog.show=false">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['dialog']
  }
</script>

<style scoped>

</style>