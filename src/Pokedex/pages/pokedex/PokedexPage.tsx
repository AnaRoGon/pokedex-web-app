import { ProgressSpinner } from "primereact/progressspinner";

import { PokemonDetailsCard } from "@/Pokedex/components/PokemonDetailsCard";
import { Navigate, useParams } from "react-router";
import { usePokemonDetails } from "@/Pokedex/hooks/usePokemonDetails";

export const PokedexPage = () => {
  const { idSlug = "" } = useParams();

  const { data: pokemonDetailsResponse, isError } = usePokemonDetails(idSlug);

  if (isError) {
    return <Navigate to="/" />;
  }

  if (!pokemonDetailsResponse) {
    return (
      <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <PokemonDetailsCard
        name={pokemonDetailsResponse.name}
        id={pokemonDetailsResponse.id}
        artwork={pokemonDetailsResponse.artwork}
        types={pokemonDetailsResponse.types}
        stats={pokemonDetailsResponse.stats}
        height={pokemonDetailsResponse.height}
        weight={pokemonDetailsResponse.weight}
        abilities={pokemonDetailsResponse.abilities}
      />
    </>
  );
};
