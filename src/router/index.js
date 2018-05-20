import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Players from '@/components/player/Players';
import PoolsDetail from '@/components/tournament/PoolsDetail';
import PoolsOverview from '@/components/tournament/PoolsOverview';
import TournamentConfig from '@/components/tournament/TournamentConfig';
import Tournament from '@/components/tournament/Tournament';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/players',
      component: Players,
    },
    {
      path: '/create',
      component: TournamentConfig,
    },
    {
      path: '/tournament/:name',
      component: Tournament,
      children: [
        {
          path: '',
          redirect: 'config'
        },
        {
          path: 'config',
          component: TournamentConfig,
        },
        {
          path: 'details',
          component: PoolsDetail,
        },
        {
          path: 'overview',
          component: PoolsOverview,
        },
      ],
    },
  ]
});
