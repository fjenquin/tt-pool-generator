import Vue from 'vue';
import App from './App.vue';
import {
  Vuetify,
  VApp,
  VBtn,
  VCard,
  VCheckbox,
  VDataTable,
  VDialog,
  VDivider,
  VExpansionPanel,
  VForm,
  VGrid,
  VIcon,
  VList,
  VNavigationDrawer,
  VSelect,
  VStepper,
  VSwitch,
  VTextField,
  VToolbar,
  transitions
} from 'vuetify';
import '../node_modules/vuetify/src/stylus/app.styl';

require('./assets/print.css');

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCheckbox,
    VDataTable,
    VDialog,
    VDivider,
    VExpansionPanel,
    VForm,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VSelect,
    VStepper,
    VSwitch,
    VTextField,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#d32f2f',
    secondary: '#37474f',
    accent: '#512da8',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
