import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { useNavigate } from "react-router";
import { ProgressSpinner } from "primereact/progressspinner";
import { usePokemonDetails } from "../hooks/usePokemonDetails";

interface Props {
  name: string;
}

export const PokemonGridCard = ({ name }: Props) => {
  const navigate = useNavigate();
  const handleClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const { data: pokemonDetailsResponse } = usePokemonDetails(name);

  const header = (pokemonImg: string) => (
    <img alt="Pokemon Image" src={pokemonImg} />
  );

  if (!pokemonDetailsResponse) {
    return (
      <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <div>
        <Fieldset legend={`#${pokemonDetailsResponse?.id}`}></Fieldset>
        <Card
          title={name.toLocaleUpperCase()}
          header={header(pokemonDetailsResponse?.artwork || " ")}
          className="md:w-25rem"
          onClick={() => handleClick(name)}
        ></Card>
      </div>
    </>
  );
};
