<template>
  <div class="home">
    <div class="container-search" v-if="isSearch">
      <img src="../assets/pokemon.png" alt="" class="logo">
      <div class="search">
        <input 
          type="text" 
          class="input" 
          placeholder="Digite a busca aqui"
          v-model="search"
          @keyup.enter="getPokemonbyName"
          >
  
          <button class="btn-search" @click="getPokemonbyName">Pesquisar</button>
      </div>
    </div>
    <CardPokemon :pokemon="pokemon" v-if="isSearch"/>
    <div class="container-search2" v-if="!isSearch">
      <img src="../assets/pokemon.png" alt="" class="logo">
      <div class="search">
        <input 
          type="text" 
          class="input" 
          placeholder="Digite a busca aqui"
          v-model="search">
  
          <button class="btn-search" @click="getPokemonbyName">Pesquisar</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {getPokemon} from '../../services/pokemon.service'
import { ref, } from 'vue'
import CardPokemon from '@/components/CardPokemon'


export default {
  name: 'Home',
  components: {
    CardPokemon
  },
  setup () {
    const search = ref('')
    const pokemon = ref({})
    const isSearch = ref(false)
    const getPokemonbyName = async () => {
      const response = await getPokemon(search.value)
      pokemon.value = response.data
      isSearch.value = true
    }
    return {
      pokemon,
      search,
      getPokemonbyName,
      isSearch
    }
  },
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container-search{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  padding: 0 1em;

  & .search{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    padding: 0 1em;
  }
  & .logo{
    width: 300px;
    margin-bottom: 1em;
  }
}
.container-search2{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .search{
    width: 70%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  & .logo{
    width: 300px;
    margin-bottom: 1em;
  }

}
.input {
  width: 80%;
  padding: 1em;
  border: 1px solid #e33d33;
  border-radius: 6px;
}
.btn-search{
  width: 15%;
  padding: 1em;
  border: 1px solid #e33d33;
  border-radius: 6px;
  background-color: #e33d33;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .container-search{
    flex-direction: column;
    width: 80%;
    & .search{
      flex-direction: column;

      & .input{
        margin-bottom: 1em;
      }
    }
  }
  .container-search2{
    flex-direction: column;
    width: 80%;
    & .search{
      flex-direction: column;

      & .input{
        margin-bottom: 1em;
      }
    }
  }
  .input {
    width: 100%;
  }
  .btn-search{
    width: 100%;
  }
  
}
</style>
