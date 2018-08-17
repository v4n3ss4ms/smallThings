<template>
    <div>
        <p>name: {{ pokemon.name }}</p>
        <p><img :src="replaceImgSrc(pokemon.image)" :alt="pokemon.name" width="100px"/></p>
        <p>experience: {{ pokemon.experience }}</p>
    </div>
</template>

<script>


export default {
  name: 'Pokemon',
  data() {
        return {
            pokemon: [],
        }
    },
    created() {
        fetch(`http://localhost:3000/pokemons/${this.$route.params.id}`)
        .then(response => response.json())
        .then(pokemon => {
            this.pokemon = pokemon;
            console.log(pokemon);
        });
    },
    methods: {
        replaceImgSrc(src) {
            return `../assets/${ src }`;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
