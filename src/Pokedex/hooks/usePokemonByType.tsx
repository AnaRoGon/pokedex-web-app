import { useQuery } from "@tanstack/react-query";
import { getPokemonByTypeAction } from "../actions/get-pokemon-by-type.action";

//Custom hook para encapsular la llamada a los detalles de los pokemon
export const usePokemonByType = (type: string | null) => {
  if (type === null || type === "all") type = "unknown";
  return useQuery({
    queryKey: ["pokemonByType", type],
    queryFn: () => getPokemonByTypeAction(type),
    staleTime: 1000 * 60 * 30,
    select: (pokemon) => ({
      pokemon: pokemon.pokemon.map((name) => name.pokemon.name),
    }),
  });
};
