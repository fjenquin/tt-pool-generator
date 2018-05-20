<template>
  <div>
    <div style="margin: 0px 10px 0px 10px;">
      <mdc-textfield v-if="searchable" trailing-icon="search" label="Filtre" v-model="search" style="min-width: 400px"/>
    </div>
    <table class="table table-bordered table-condensed" style="margin-bottom: 0px;">
      <thead>
        <tr>
          <th v-if="selectable" class="text-left"><mdc-checkbox v-model="all"/></th>
          <th v-if="numbered" class="text-center"></th>
          <th class="text-left">Nom</th>
          <th style="max-width:0px">{{ shortHeaders ? 'Ind.' : 'Indice' }}</th>
          <th style="max-width:0px">{{ shortHeaders ? 'Cla.' : 'Classement' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in visibleRows" :key="player.Id">
          <td v-if="selectable" style="padding-top: 0px;"><mdc-checkbox v-model="selected[player.Id]"  @change="emitAdaptedSelection"/></td>
          <td v-if="numbered">{{ index + 1 }}</td>
          <td>{{ player.FirstName}} {{ player.Name}}</td>
          <td class="text-right">{{ player.Index }}</td>
          <td class="text-right">{{ player.Ranking}}</td>    
        </tr>
      </tbody>
      <tfoot v-if="!hideActions">
        <tr>
          <td class="text-right" :colspan="3 + (numbered ? 1 : 0) + (selectable ? 1 : 0)">
            <div style="display: flex; flex-direction: row; place-content: center flex-end; align-items: center;">
              <div style="flex: 1 1 auto"></div>
              <div>Lignes par page</div>
              <div style="flex: 0 0 100px;">
                <mdc-select v-model="rowsPerPage">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>Toutes</option>
                </mdc-select>
              </div>
              <div style="flex: 0 0 150px;">{{ minRow }}-{{ maxRow }} sur {{ filteredPlayers.length }}</div>
              <div style="flex: 0 0 50px;">
                <mdc-button @click="page = page -1" :disabled="page === 1"><i class="material-icons mdc-button__icon">chevron_left</i></mdc-button>
              </div>
              <div style="flex: 0 0 50px;">
                <mdc-button @click="page = page + 1" :disabled="page === maxPage"><i class="material-icons mdc-button__icon">chevron_right</i></mdc-button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const EVENT_SELECTION_CHANGED = 'selection-changed';
const ALL_ROWS = 'Toutes';
let accents = require('remove-accents');

export default {
  props: [
    'hideActions',
    'numbered',
    'players',
    'searchable',
    'selectable',
    'selectedIds',
    'shortHeaders'
  ],
  computed: {
    all: {
      get: function() {
        return this.selected.length === this.players.length;
      },
      set: function(newValue) {
        const sel = {};
        this.players.forEach(player => {
          sel[player.Id] = newValue;
        });
        this.selected = sel;
        this.emitAdaptedSelection();
      }
    },
    filteredPlayers: function() {
      if (!this.search || this.search.trim().length === 0) {
        return this.players;
      }
      return this.players.filter(
        p =>
          accents
            .remove(p.FirstName + ' ' + p.Name + ' ' + p.Ranking)
            .toLowerCase()
            .indexOf(accents.remove(this.search).toLowerCase()) > -1
      );
    },
    maxPage: function() {
      if (this.rowsPerPage === 'Toutes') {
        return 1;
      }
      return Math.ceil(this.filteredPlayers.length / this.rowsPerPage);
    },
    maxRow: function() {
      if (this.rowsPerPage === ALL_ROWS) {
        return this.filteredPlayers.length;
      }
      const v = this.page * this.rowsPerPage;
      if (v > this.filteredPlayers.length) {
        return this.filteredPlayers.length;
      } else {
        return v;
      }
    },
    minRow: function() {
      if (this.rowsPerPage === ALL_ROWS) {
        return 1;
      }
      return (this.page - 1) * this.rowsPerPage + 1;
    },
    visibleRows: function() {
      if (this.hideActions || this.rowsPerPage === ALL_ROWS) {
        return this.filteredPlayers;
      }
      const nbRows = Number(this.rowsPerPage);
      return this.filteredPlayers.slice(
        nbRows * (this.page - 1),
        nbRows * this.page
      );
    }
  },
  data: function() {
    const selected = {};
    if (this.selectable) {
      this.players.forEach(player => {
        selected[player.Id] = this.selectedIds.includes(player.Id);
      });
    }
    return {
      page: 1,
      rowsPerPage: '10',
      search: '',
      selected
    };
  },
  methods: {
    emitAdaptedSelection: function() {
      const array = [];
      Object.keys(this.selected).forEach(k => {
        if (this.selected[k]) {
          array.push(Number(k));
        }
      });
      this.$emit(EVENT_SELECTION_CHANGED, array);
    },
    filter: function(items, search) {
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
    filteredPlayers: function(val) {
      this.page = 1;
    },
    selectedIds: function(val) {
      if (this.selectable) {
        const selected = {};
        this.players.forEach(player => {
          selected[player.Id] = this.selectedIds.includes(player.Id);
        });
        this.selected = selected;
      }
    },
  }
};
</script>

<style scoped>
.small-column {
  /* padding: 0px 10px 0px 10px !important; */
  /* margin: 0px !important; */
}
tfoot .mdc-select {
  padding-bottom: 0px !important;
  padding-top: 4px !important;
  margin-top: -24px !important;
  height: 50px !important;
}
</style>