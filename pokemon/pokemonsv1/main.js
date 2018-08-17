const PokemonCard = {
    props: {
        pokemon: {
            type: Object,
            value: {},
        },
     },
    template: '#pokemonCard',
    methods: {
        replaceImgSrc(src) {
            return `assets/${ src }`;
        },
    },
};

const app = new Vue({
    el: '#app',
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
        filterByType(pokemons, type) {
            this.filteredPokemons = pokemons.filter(pokemon => pokemon.types.includes(type));
        },
        showAll() {
            this.filteredPokemons = this.fullPokemons;
        },
    },
    components: {
        PokemonCard: PokemonCard,
    },
});