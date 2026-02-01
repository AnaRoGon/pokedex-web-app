import { CustomHeader } from "@/components/custom/CustomHeader";
import { PokemonGrid } from "@/Pokedex/components/PokemonGrid";
import { CustomSearchCard } from "@/components/custom/CustomSearchCard";
import { usePokemonAvailables } from "@/Pokedex/hooks/usePokemonAvailables";
import { usePokemonByType } from "@/Pokedex/hooks/usePokemonByType";
import { useEffect, useState } from "react";
import { usePaginator } from "@/Pokedex/hooks/usePaginator";

import { POKEMON_TYPES } from "@/Pokedex/constants/pokemon-types";

export const SearchPage = () => {
  const storedType = sessionStorage.getItem("type-state") || "all";
  const actualType = POKEMON_TYPES.includes(storedType) ? storedType : "all";
  const actualQuery = sessionStorage.getItem("query-state") || "";

  const [type, setType] = useState<string>(actualType);
  const [query, setQuery] = useState<string>(actualQuery);

  const { data: pokemonResponse } = usePokemonAvailables();
  const { data: pokemonTypeResponse } = usePokemonByType(type);

  let filteredPokemon: string[] = pokemonTypeResponse?.pokemon.length
    ? pokemonTypeResponse.pokemon || []
    : pokemonResponse || [];

  if (query !== "") {
    filteredPokemon = filteredPokemon.filter((name) => name.includes(query));
  }

  const { first, rows, onPageChange, setFirst } = usePaginator();

  const handleTypeChange = (newType: string) => {
    setType(newType);
    setFirst(0);
    sessionStorage.setItem("page-state", "1");
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setFirst(0);
  };

  useEffect(() => {
    sessionStorage.setItem("type-state", type);
  }, [type]);

  useEffect(() => {
    sessionStorage.setItem("query-state", query);
  }, [query]);

  return (
    <>
      <div className="flex flex-1 flex-row items-center justify-center text-center p-10">
        <CustomHeader
          title="POKÉDEX ONLINE"
          subtitle="Discover everything about your favorite Pokémon with just one click!"
          color="text-yellow-600"
        />
      </div>

      <CustomSearchCard
        onTypeChange={handleTypeChange}
        onQueryChange={handleQueryChange}
        defaultType={type}
        defaultQuery={query}
      />

      {filteredPokemon.length > 0 && (
        <PokemonGrid
          pokemonsName={filteredPokemon ?? []}
          first={first}
          rows={rows}
          onPageChange={onPageChange}
        />
      )}

      {filteredPokemon.length === 0 && (
        <p className="mb-10">
          No se han encontrado Pokémon que correspondan con esta búsqueda
        </p>
      )}
    </>
  );
};

export default SearchPage;
