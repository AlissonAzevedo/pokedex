import api from "../api/api";

export function getPokemon(name) {
  const response = api.get(`/pokemon/${name}`);
  return response
}