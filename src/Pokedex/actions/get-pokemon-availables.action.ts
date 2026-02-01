import { pokedexApi } from "../api/pokedex.api";
import type { PokemonResponse } from "../types/get-pokemons-result.response";

export const getPokemonAvailablesAction = async (): Promise<string[]> => {
  const { data } = await pokedexApi.get<PokemonResponse>(
    "pokemon/?limit=1000&offset=0",
  );
  const pokemons = data.results.map((pokemon) => pokemon.name);
  return pokemons;
};
