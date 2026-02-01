import { PokemonGridCard } from "./PokemonGridCard";
import { Paginator } from "primereact/paginator";

interface Props {
  pokemonsName: string[];
  first: number;
  rows: number;
  onPageChange: (event: any) => void;
}

export const PokemonGrid = ({
  pokemonsName,
  first,
  rows,
  onPageChange,
}: Props) => {
  const currentPokemons = pokemonsName.slice(first, first + rows);

  return (
    <>
      <div className="inline-flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-8">
          {currentPokemons.map((name) => {
            return <PokemonGridCard key={name} name={name} />;
          })}
        </div>
        <Paginator
          className="mb-30"
          first={first}
          rows={rows}
          totalRecords={pokemonsName.length}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};
