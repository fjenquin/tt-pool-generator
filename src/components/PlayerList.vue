<template>
  <div>
    <v-text-field v-if="selectable" append-icon="search" v-model="search"/>
    <v-data-table
      :items="players"
      :search="search"
      :custom-filter="filter"
      :hide-actions="hideActions"
    >
      <template slot="headers" slot-scope="headers">
        <tr>
          <th v-if="selectable"><v-checkbox v-model="all" color="primary"/></th>
          <th v-if="numbered" class="text-xs-center small-column"></th>
          <th class="text-xs-left">Nom</th>
          <th class="small-column">Indice</th>
          <th class="small-column">Classement</th>
        </tr>
      </template>


      <template slot="items" slot-scope="player">
          <td v-if="selectable"><v-checkbox v-model="selected" v-bind:value="player.item.Id" color="secondary"/></td>
          <td v-if="numbered" class="small-column">{{ player.index + 1 }}</td>
          <td>{{ player.item.FirstName}} {{ player.item.Name}}</td>
          <td class="small-column text-xs-right">{{ player.item.Index }}</td>
          <td class="small-column">{{ player.item.Ranking}}</td>    
      </template>
    </v-data-table>
  </div>
  
</template>

<script>
const EVENT_SELECTION_CHANGED = 'selection-changed';

export default {
  props: ['players', 'selectable', 'hideActions', 'selectedIds', 'numbered'],
  data: function() {
    return {
      search: '',
      selected: this.selectedIds || []
    };
  },
  computed: {
    all: {
      get: function() {
        return this.selected.length === this.players.length;
      },
      set: function(newValue) {
        if (newValue) {
          this.selected = this.players.map(player => player.Id);
        } else {
          this.selected = [];
        }
      }
    }
  },
  methods: {
    filter: (items, search) => {
      if (!search) {
        return items;
      }
      return items.filter(
        i =>
          (i.FirstName + ' ' + i.Name)
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1
      );
    }
  },
  watch: {
    selected: function(val) {
      this.$emit(EVENT_SELECTION_CHANGED, val);
    }
  }
};
</script>

<style scoped>
.small-column {
  padding: 0px 10px 0px 10px !important;
  margin: 0px !important;
}
</style>