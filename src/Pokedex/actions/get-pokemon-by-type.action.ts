import { pokedexApi } from "../api/pokedex.api";
import type { PokemonTypeResponse } from "../types/get-pokemons-by-type";

export const getPokemonByTypeAction = async (
  type: string,
): Promise<PokemonTypeResponse> => {
  const { data } = await pokedexApi.get<PokemonTypeResponse>(`/type/${type}`);
  return data;
};
