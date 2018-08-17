<template>
    <div>
        {{ pokemon.name }}
        <img :src="replaceImgSrc(pokemon.image)" :alt="pokemon.name" width="100px"/>
    </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
        pokemon: {
            type: Object,
            value: {},
        },
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





