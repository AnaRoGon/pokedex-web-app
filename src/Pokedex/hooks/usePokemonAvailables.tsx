import { useQuery } from "@tanstack/react-query";
import { getPokemonAvailablesAction } from "../actions/get-pokemon-availables.action";

export const usePokemonAvailables = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemonAvailablesAction(),
    staleTime: 1000 * 60 * 30,
  });
};
