<template>
    <div class="container">
        <div class="btn-back">
            <router-link to="/">
                <h3>Voltar</h3>
            </router-link>
        </div>
        <div class="card">
            <span># {{pokemon.id}}</span>
            <h3>{{pokemon.name}}</h3>
            <div class="container-header">
                <ul class="type">
                    <li v-for="(type, key) in pokemon.types" :key="key" :class="type.type.name">
                        <img :src="require(`@/assets/pokemonTypes/${type.type.name}.svg`)" class="type-icon">
                        <!-- <img src="../assets/pokemonTypes/fire.svg" class="type-icon"> -->
                        <span>{{ type.type.name }}</span>
                    </li>
                </ul>
                <img :src="`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`" :alt="pokemon.name"
                    class="img-pokemon">
            </div>
            <PokemonStep :pokemon="pokemon" />
        </div>
    </div>
</template>

<script>
import PokemonStep from '@/components/PokemonStep'
import { ref, onMounted } from 'vue'
import { getPokemon } from '../../services/pokemon.service'
import { useRoute } from 'vue-router'

export default {
    name: 'PokemonView',
    components: {
        PokemonStep
    },
    setup() {
        const route = useRoute()
        const pokemon = ref({})
        const pokemonName = route.params.name
        const getPokemonbyName = async () => {
            const response = await getPokemon(pokemonName)
            pokemon.value = response.data
        }
        const pokemonInfo = onMounted(() => {
            getPokemonbyName()
        })
        return {
            getPokemonbyName,
            pokemonInfo,
            pokemon,
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../pokemon_types.scss';

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .btn-back {
        position: absolute;
        top: 0;
        left: 25px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;    
        cursor: pointer;

        a {
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
        
        h3 {
            font-size: 1.2rem;
            font-weight: 500;
            color:#e33d33;
        }
    }
}

.card {
    height: 600px;
    width: 600px;
    min-width: 260px;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding: 2em 1em;
    border-radius: 1em;
    border: 1px solid #e33d33;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5);
    background-color: #333;
    color: #fff;
    

    & h3 {
        text-transform: capitalize;
    }

}

.container-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

.img-pokemon {
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 200px;
}

.type {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-around;
    align-items: flex-start;
    width: 60%;
    margin-right: 0.5em;

    & li {
        margin: 0.5em 0;
    }

    & li {
        width: 120px;
        justify-content: space-around;
        align-items: center;
        display: flex;
        flex-direction: row;
        border-radius: 0.5em;
        padding: 0.5em;
        list-style: none;
        color: white;
        text-transform: uppercase;

        & .type-icon {
            max-width: 20px;
            max-height: 20px;
            margin-right: 0.5em;
        }
    }
}

@media screen and (max-width: 768px) {
    .card {
        width: 380px;
    }

    .container-header {
        width: 100%;
        justify-content: flex-start;

        & type {
            width: 100%;
            align-items: flex-start;
        }
    }
    .stats {
        flex-direction: column;

        & li {
            margin: 0.5em 0;
            width: 90%;
            list-style: outside;
            text-align: left;
        }
    }


}

@media screen and (max-width: 480px) {
    .card {
        width: 300px;
    }

    .container-header {
        width: 100%;
        justify-content: flex-start;

        & .img-pokemon{
            max-width: 150px;
            max-height: 150px;
        }

        & type {
            width: 100%;
            align-items: flex-start;
        }
    }
    .stats {
        flex-direction: column;

        & li {
            margin: 0.5em 0;
            width: 90%;
            list-style: outside;
            text-align: left;
        }
    }
}

.normal {
    background-color: $normal
}

.fire {
    background-color: $fire
}

.water {
    background-color: $water
}

.grass {
    background-color: $grass
}

.electric {
    background-color: $electric
}

.ice {
    background-color: $ice
}

.fighting {
    background-color: $fighting
}

.poison {
    background-color: $poison
}

.ground {
    background-color: $ground
}

.flying {
    background-color: $flying
}

.psychic {
    background-color: $psychic
}

.bug {
    background-color: $bug
}

.rock {
    background-color: $rock
}

.ghost {
    background-color: $ghost
}

.dark {
    background-color: $dark
}

.dragon {
    background-color: $dragon
}

.steel {
    background-color: $steel
}

.fairy {
    background-color: $fairy
}
</style>