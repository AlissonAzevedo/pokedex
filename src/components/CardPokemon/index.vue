<template>
    <div class="container">
        <div class="card">
          <img :src="`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`" :alt="pokemon.name" class="img-pokemon">
          <p class="id">#{{pokemon.id}}</p>
          <h3 class="title">{{pokemon.name}}</h3>
          <router-link :to="`/pokemon/${pokemon.name}`">
            <button class="btn">Ver detalhes</button>
          </router-link>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
export default {
    name: 'CardPokemon',
    props: {
        pokemon: {
            type: Object,
            default: () => {}
        }
    },
    setup () {
        const pokemonInfo = computed(() => {
            return this.pokemon
        })
        return {
            pokemonInfo
        }
    }
}
</script>

<style scoped>

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em;
}
.card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2em 1em;
    margin-bottom: 2em;
    width: 280px;
    border-radius: 1em;
    border: 1px solid #e33d33;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5);
    background-color: #333;
    color: #fff;
    min-width: 170px;
}

.img-pokemon {
    width: 100%;
    height: 100%;
    max-width: 120px;
    max-height: 120px;
}

.id {
    background-color: #e33d33;
    margin: 1em 0;
    border-radius: 5px;
    padding: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    text-transform: capitalize;
    margin-bottom: 1em;
    font-size: 1.3em;
}

.btn {
    text-decoration: none;
    background-color: #fff;
    color: #222;
    padding: 0.7em 1.2em;
    border-radius: 6px;
    font-weight: bold;
    transition: 0.4s;
}

.btn:hover {
    background-color: #e33d33;
    color: #fff;
}

</style>