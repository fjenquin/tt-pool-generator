<template>
  <div id="app">
    <mdc-layout-app>
      <mdc-top-app-bar slot="toolbar" :title="'TT' + (selectedTournament ? (' - ' + selectedTournament.name) : '')" :fixed="true" event="toggle-drawer">
      </mdc-top-app-bar>
      <mdc-drawer slot="drawer" toggle-on="toggle-drawer" toolbar-space="true">
        <mdc-drawer-list>
          <mdc-drawer-item to="/players" @click="unselect()">
            <mdc-icon slot='start-detail' icon="account_circle"></mdc-icon>
            Gérer les joueurs
          </mdc-drawer-item>
          <mdc-drawer-divider />
          <mdc-drawer-item to="/create" @click="unselect()">
            <mdc-icon slot='start-detail' icon="add_box"></mdc-icon>
            Nouveau tournoi
          </mdc-drawer-item>
          <mdc-drawer-divider />
          <mdc-drawer-item v-for="tournament in tournaments" :key="tournament.name"
              :to="'/tournament/' + tournament.name + '/details'">
            <div style="display: flex; flex-direction: row; width: 100%">
              <div style="flex: 1 0 auto">{{ tournament.name }}</div>
              <mdc-icon icon="delete" style="flex: 0 0 auto" @click.native.stop.prevent="deleteName=tournament.name"/>
            </div>
          </mdc-drawer-item>
        </mdc-drawer-list>
      </mdc-drawer>
      <main class="content">
        <router-view></router-view>
      </main>
    </mdc-layout-app>

    <mdc-dialog :open="deleteName !== null"
      :title="'Supprimer ' + deleteName" accept="Supprimer" cancel="Annuler"
      @accept="deleteTournament()" @cancel="deleteName=null">
      Vous allez supprimer le tournoi {{ deleteName }}.
    </mdc-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ACTION_TOURNAMENT_SELECT, ACTION_TOURNAMENT_DELETE } from '@/constants/StoreConstants';

export default {
  name: 'App',
  computed: mapState(['players', 'selectedTournament', 'tournaments']),
  data: function() {
    return {
      deleteName: null,
    };
  },
  methods: {
    deleteTournament: function() {
      this.$store.commit(ACTION_TOURNAMENT_DELETE, this.tournaments.find(t => t.name === this.deleteName));
    },
    unselect: function() {
      this.$store.commit(ACTION_TOURNAMENT_SELECT, null);
    }
  }
};
</script>

<style lang="scss">
@import 'assets/print.css';

$mdc-theme-primary: #37474f;
$mdc-theme-secondary: #d32f2f;
$mdc-theme-accent: #41b883;
$mdc-main-background: #fafafa;

@import 'vue-mdc-adapter/dist/styles';

.mdc-layout-app {
  width: 100% !important;
}

.mdc-layout-app--content-wrapper {
  background: $mdc-main-background;
}

.text-error {
  color: $mdc-text-field-error;
}
</style>

<style>
.mdc-layout-app {
  width: 100vw;
  height: 100vw;
}

.mdc-layout-app--toolbar-wrapper {
  flex: 0 0 65px;
}

.bold-text {
  font-weight: bold;
}

.text-right {
  text-align: right !important;
}

.text-center {
  text-align: center !important;
}

.text-left {
  text-align: left !important;
}

th {
  text-align: center !important;
}

/*
From https://github.com/srsgores/material-table
	material-table
	material-table.styl
	Author: Sean Goresht
	Created on 2015-03-10 in PhpStorm
*/
/* -- Variables -- */
/* -- import Roboto Font -- */
.table {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
  width: 100%;
  max-width: 100%;
  margin-bottom: 2em;
  background-color: #fff;
  border: 0;
  border-collapse: collapse;
  font-family: "RobotoDraft", "Roboto", "Helvetica Neue, Helvetica, Arial", sans-serif;
  color: #212121;
}
.table th,
.table td {
  text-align: left;
  padding: 1.6em;
  vertical-align: top;
  border: inherit;
}
.table thead tr {
  border-bottom: 1px solid #e1e1e1;
}
.table thead th {
  font-weight: 400;
  color: #3f3f3f;
  vertical-align: bottom;
}
.table caption + thead tr:first-child,
.table colgroup + thead tr:first-child,
.table thead:first-child tr:first-child {
  border-top: 0;
}
.table caption + thead tbody + .table caption + thead tbody,
.table colgroup + thead tbody + .table colgroup + thead tbody,
.table thead:first-child tbody + .table thead:first-child tbody {
  border-top: 1px solid #dedede;
}
.table caption {
  opacity: 0.5;
  font-size: 0.8em;
  text-transform: uppercase;
  font-style: italic;
  text-align: left;
  line-height: 2;
  margin: 1em 0;
}
.table-header-title {
  font-size: 2.4em;
  line-height: 3.2em;
  letter-spacing: 0;
  font-weight: 300;
  color: #212121;
  text-transform: inherit;
  margin-bottom: 1em;
  text-align: center;
}
.table-header-subtitle {
  font-size: 1.5em;
  line-height: 2.8em;
  letter-spacing: 0.01em;
  font-weight: 400;
  color: #212121;
  text-align: center;
}
.table-bordered thead tr {
  border-bottom-width: 2px;
}
.table-bordered tr {
  border-bottom: 1px solid #e1e1e1;
}
.table-condensed tr,
.table-condensed th,
.table-condensed td {
  padding: 0.8em;
}
.table-striped tbody tr:nth-child(odd) {
  background-color: #f6f6f6;
}
.table-hover tbody tr {
  transition: background-color 0.3s ease, opacity 0.3s ease;
}
.table-hover tbody tr:hover {
  background-color: #e7e7e7;
}
@media screen and (max-width: 768px) {
  .table-responsive-vertical .table {
    margin-bottom: 0;
    background-color: transparent;
  }
  .table-responsive-vertical .table thead,
  .table-responsive-vertical .table tfoot {
    display: none;
  }
  .table-responsive-vertical .table tbody {
    display: block;
  }
  .table-responsive-vertical .table tbody tr {
    display: block;
    border: 1px solid #e1e1e1;
    border-radius: 2px;
    margin-bottom: 1.6em;
  }
  .table-responsive-vertical .table tbody tr td {
    background-color: #fff;
    display: block;
    vertical-align: middle;
    text-align: right;
  }
  .table-responsive-vertical .table tbody tr td[data-title]:before {
    content: attr(data-title);
    float: left;
    font-size: inherit;
    font-weight: 400;
    color: #3f3f3f;
  }
}

</style>
