<template>
    <div class="container-step">
        <div class="header-step">
            <span :class="{'active': currentStep == 0}" @click.prevent="goToStep(0)">About</span>
            <span :class="{'active': currentStep == 1}" @click.prevent="goToStep(1)">Base Stats</span>
            <span :class="{'active': currentStep == 2}" @click.prevent="goToStep(2)">Evolution</span>
        </div>
        <template v-if="currentStep == 0" >
            <h3 class="title-about">Pokédex Data</h3>
            <ul class="stats">
                <li>
                    <span>
                        height
                    </span>
                    <span class="value-stat">
                        {{pokemon.height}}
                    </span>
                </li>
                <li>
                    <span>
                        weight
                    </span>
                    <span class="value-stat">
                        {{pokemon.weight}}
                    </span>
                </li>
                <li>
                    <span>
                        abilities
                    </span>
                    <span class="value-stat" v-for="ability in pokemon.abilities" :key="ability.ability.name">
                        {{ability.ability.name}}
                    </span>
                </li>
            </ul>
            <h3 class="title-about">Training</h3>
            <ul class="stats">
                <li>
                    <span>
                        base experience
                    </span>
                    <span class="value-stat">
                        {{pokemon.base_experience}}
                    </span>
                </li>
            </ul>
        </template>
        <template v-if="currentStep == 1" class="step">
            <ul class="stats">
                <li v-for="stat in pokemon.stats" :key="stat.stat.name">
                    <span>
                        {{ stat.stat.name }}
                    </span>
                    <span class="value-stat">
                        {{ stat.base_stat }}
                    </span>

                </li>
            </ul>
        </template>
        <template v-if="currentStep == 2">
            <div class="container-evolutions">
                <div v-for="evolution in evolutionChain" :key="evolution">
                    <img :src="`https://cdn.traction.one/pokedex/pokemon/${evolution}.png`" :alt="evolution"
                        class="img-pokemon">
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { getPokemonEvolution, getIdPokemon} from '../../../services/pokemon.service'
import { 
    ref,
    watch
} from 'vue'
export default {
    name: 'PokemonStep',
    props: {
        pokemon: {
            type: Object,
            default: () => { },
            required: true
        }
    },
    setup(props) {
        const evolutionChain = ref([])
        const evolutionNames = ref([])
        const currentStep = ref(0)
        const goToStep = (step) => {
            currentStep.value = step
        }

        const getEvolutionChain = async (id) => {
            const response = await getPokemonEvolution(id)
            const firstEvolution = response.data.chain.species.name
            evolutionNames.value.push(firstEvolution)
            const secondEvolution = response.data.chain.evolves_to[0]?.species.name
            evolutionNames.value.push(secondEvolution)
            const thirdEvolution = response.data.chain.evolves_to[0].evolves_to[0]?.species.name
            evolutionNames.value.push(thirdEvolution)

            for(let i = 0; i < evolutionNames.value.length; i++){
                const response = await getIdPokemon(evolutionNames.value[i])
                evolutionChain.value.push(response.data.id)       
            }
        }

        getEvolutionChain(props.pokemon.id)
        watch(currentStep, () => {
            if (currentStep.value == 2) {
                if(evolutionChain.value.length < 2){
                    getEvolutionChain(props.pokemon.id)
                }
            }
        })
      
        return {
            currentStep,
            goToStep,
            evolutionChain,
            evolutionNames,
            getEvolutionChain
        }
    }
}
</script>

<style lang="scss" scoped>
.container-step {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;

    & .title-about {
        // color: #e33d33;
        text-align: left;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 1rem 0;
    }
}

.step {
    width: 100%;
    height: 170px;
}


.header-step {
    width: 100%;
    // height: 60px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 16px;
    align-items: center;
    padding: 4px 6px;

    span {
        width: 120px;
        padding: 10px;
        border-radius: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;

        &.active {
            color: white;
            background-color: #e33d33;
        }
    }
}

.stats {
    color: white;
    text-align: left;
    width: 100%;

    & li {
        display: flex;
        justify-content: space-between;
        list-style: none;
        text-transform: capitalize;
        margin: 0 0.5em;
        text-align: center;
    }

    & .value-stat {
        color: #e33d33;
        font-weight: bold;
    }
}

.container-evolutions{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    .img-pokemon{
        width: 100px;
        height: 100px;
    }
}

@media screen and (max-width: 768px) {
    .container-step {
        height: 100%;
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
</style>