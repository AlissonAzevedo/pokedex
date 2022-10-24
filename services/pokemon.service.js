import api from "../api/api";

export function getPokemon(name) {
  const response = api.get(`/pokemon/${name}`);
  return response
}

export function getPokemonEvolution(id) {
  const response = api.get(`/evolution-chain/${id}`);
  return response
}

export function getIdPokemon(name) {
  const response = api.get(`/pokemon/${name}`);
  return response
}