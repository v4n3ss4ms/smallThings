<template>
  <div>
        <div>
            <button type="button" v-on:click="showAll">Todos</button>
            <button type="button" 
                :key="typeP"
                v-on:click="filterByType(fullPokemons, typeP)"
                v-for="typeP in typeList">
                {{ typeP }}
            </button>          
        </div>
         <ul>
            <li :key="pokemon.id" v-for="(pokemon, index) in filteredPokemons">
                <router-link :to="{name: 'pokemon',params:{id: pokemon.id}}">
                    <pokemon-card :pokemon="pokemon"></pokemon-card>
                    {{ pintaFin(index,filteredPokemons)}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

import PokemonCard from '@/components/PokemonCard.vue';

export default {
  name: 'Pokemons',
  data() {
        return {
            fullPokemons: [],
            filteredPokemons: [],
            typeList: [],
        }
    },
    created() {
        fetch('http://localhost:3000/pokemons/')
        .then(response => response.json())
        .then(pokemons => {
            this.fullPokemons = pokemons;
            this.filteredPokemons = pokemons;
            this.typeList = this.typePkm(pokemons);
            console.log(this.fullPokemons);
            console.log(this.typePkm(this.fullPokemons));
        });
    },
    methods: {
        typePkm(pokemons) {
            const temporalList = pokemons.map(pokemon => pokemon.types)
                .reduce((types, acc) => acc.concat(types),[]);
            return Array.from(new Set(temporalList));
        },
        filterByType(pokemons, typeP) {
            this.filteredPokemons = pokemons.filter(pokemon => pokemon.types.includes(typeP));
        },
        showAll() {
            this.filteredPokemons = this.fullPokemons;
        },
        pintaFin(index, collection) {
            return (index === (collection.length-1)) ? '#############' : '';
        },
    },
    components: {
        PokemonCard: PokemonCard,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
