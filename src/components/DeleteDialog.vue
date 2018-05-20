<template>
  <mdc-dialog v-model="dialog.show" 
      accept="Confirmer" cancel="Annuler" 
      :title="'Supprimer ' + dialog.name"
      @accept="dialog.show=false;$emit('delete-confirmed')" @cancel="dialog.show=false">
      Vous allez supprimer {{ dialog.name}}
  </mdc-dialog>
</template>

<script>
  export default {
    props: ['dialog']
  };
</script>

<style scoped>

</style>