import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Pokemons from './views/Pokemons.vue';
import Pokemons2 from './views/Pokemons2.vue';
import Pokemon from './views/Pokemon.vue';
import Pokemon2 from './views/Pokemon2.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: Pokemons,
    },
    {
      path: '/pokemons2',
      name: 'pokemons2',
      component: Pokemons2,
      children: [
        {
          path: ':id',
          name: 'pokemon2',
          component: Pokemon2,
        },
      ],
    },
    {
      path: '/pokemons/:id',
      name: 'pokemon',
      component: Pokemon,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
