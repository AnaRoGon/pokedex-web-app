import { MeterGroup } from "primereact/metergroup";
import type { Ability, Stat, Type } from "../types/get-pokemons-details";
import { PokemonGridCard } from "./PokemonGridCard";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { Divider } from "primereact/divider";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { getBackgroundColorByType } from "../actions/get-background-color-by-type";

interface Props {
  name: string;
  id: number;
  artwork: string | undefined;
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
  abilities: Ability[];
}

export const PokemonDetailsCard = ({
  name,
  types,
  stats,
  height,
  weight,
  abilities,
}: Props) => {
  const navigate = useNavigate();

  const arrayStats: string[] = [];
  const arrayStatsPoints: number[] = [];
  stats.map((s) => {
    const capitaliceStats =
      s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1);
    arrayStats.push(capitaliceStats);
    arrayStatsPoints.push(s.base_stat);
  });

  const arrayTypes: string[] = [];
  types.map((t) => {
    const capitaliceTypes =
      t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1);
    arrayTypes.push(capitaliceTypes);
  });

  const arrayAbilities: string[] = [];
  abilities.map((a) => {
    const capitaliceAbilities =
      a.ability?.name.charAt(0).toUpperCase() + a.ability.name.slice(1);
    arrayAbilities.push(capitaliceAbilities);
  });

  const values = [
    { label: arrayStats[0], color: "#34d399", value: arrayStatsPoints[0] },
    { label: arrayStats[1], color: "#fbbf24", value: arrayStatsPoints[1] },
    { label: arrayStats[2], color: "#60a5fa", value: arrayStatsPoints[2] },
    { label: arrayStats[3], color: "#fc8484", value: arrayStatsPoints[3] },
    { label: arrayStats[4], color: "#fcba84", value: arrayStatsPoints[4] },
    { label: arrayStats[5], color: "#c084fc", value: arrayStatsPoints[5] },
  ];

  return (
    <>
      <CustomHeader
        title="POKÉDEX ONLINE"
        subtitle="Discover everything about your favorite Pokémon with just one click!"
        color="text-yellow-600"
      />
      <div className="inline-flex flex-col md:flex-row justify-center mb-20 overflow-x-auto p-5">
        <PokemonGridCard key={name} name={name} />

        <section className="rounded-lg overflow-hidden border-2 border-orange-600 mb-8 m-6">
          <div className="flex flex-col justify-content-center p-5">
            <p
              data-testid="paragraph-test"
              className="text-3xl md:text-6xl font-mono p-4 text-left "
            >
              Pokemon Details
            </p>
            <Divider />
            <div className="flex gap-5">
              <div
                data-testid="div-types-test"
                className="flex items-center text-1xl md:text-2xl font-mono mb-3 p-3 text-left gap-10"
              >
                Types:
                {arrayTypes.map((type) => (
                  <Badge
                    key={type}
                    unstyled={true}
                    className={getBackgroundColorByType(type)}
                    value={type}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center text-1xl md:text-2xl font-mono mb-3 p-3 text-left gap-5">
                <span data-testid="span-height-test">Height: </span>
                <span data-testid="span-height-test-result">
                  {height / 10} m
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <p className="flex items-center text-1xl md:text-2xl font-mono mb-3 p-3 text-left gap-5">
                <span data-testid="span-weight-test">Weight: </span>
                <span data-testid="span-weight-test-result">
                  {weight / 10} kg
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <div
                data-testid="div-abilities-test"
                className="flex items-center text-1xl md:text-2xl font-mono mb-3 p-3 text-left gap-5"
              >
                Abilities:{" "}
                {arrayAbilities.map((ability, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="pi pi-star"
                      style={{ fontSize: "2rem" }}
                    ></span>
                    <p data-testid="paragraph-test-ability">{ability}</p>
                  </div>
                ))}
              </div>
            </div>

            <p
              data-testid="paragraph-stadistic-test"
              className="flex items-center text-1xl md:text-2xl font-mono mb-3 p-3 text-left"
            >
              Stadistics:
            </p>
            <div className="flex gap-3">
              <MeterGroup className="p-3" values={values} />
            </div>
            <Button
              className="p-5"
              icon="pi pi-arrow-left"
              rounded
              text
              aria-label="Filter"
              size="large"
              onClick={() => navigate(-1)}
            />
          </div>
        </section>
      </div>
    </>
  );
};
