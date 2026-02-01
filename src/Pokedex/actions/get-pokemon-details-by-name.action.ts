import { pokedexApi } from "../api/pokedex.api";
import type { PokemonDetailsResponse } from "../types/get-pokemons-details";

export const getPokemonDetailsByNameAction = async (
  idSlug: string,
): Promise<PokemonDetailsResponse> => {
  const { data } = await pokedexApi.get<PokemonDetailsResponse>(
    `pokemon/${idSlug}`,
  );
  return data;
};
