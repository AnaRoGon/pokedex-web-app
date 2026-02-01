import { useQuery } from "@tanstack/react-query";
import { getPokemonDetailsByNameAction } from "../actions/get-pokemon-details-by-name.action";

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: ["pokemonDetails", name],
    queryFn: () => getPokemonDetailsByNameAction(name),
    staleTime: 1000 * 60 * 30,
    select: (pokemon) => ({
      name: pokemon.name,
      id: pokemon.id,
      artwork: pokemon.sprites.other?.["official-artwork"].front_default,
      stats: pokemon.stats,
      types: pokemon.types,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities,
    }),
  });
};
