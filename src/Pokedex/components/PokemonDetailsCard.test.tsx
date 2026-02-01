import { describe, test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonDetailsCard } from "./PokemonDetailsCard";
import { MemoryRouter } from "react-router";

vi.mock("@/components/custom/CustomHeader", () => ({
  CustomHeader: () => <div data-testid="custom-header"></div>,
}));

vi.mock("./PokemonGridCard", () => ({
  PokemonGridCard: ({ name }: { name: string }) => (
    <div data-testid="pokemon-grid-card">{name}</div>
  ),
}));

vi.mock("primereact/badge", () => ({
  Badge: () => <div data-testid="badge"></div>,
}));

vi.mock("primereact/metergroup", () => ({
  MeterGroup: () => <div data-testid="meter-group"></div>,
}));

vi.mock("primereact/button", () => ({
  Button: () => <div data-testid="button"></div>,
}));

const mockPokemonDetailsData = {
  name: "charmander",
  id: 4,
  height: 6,
  weight: 85,
  abilities: [
    {
      ability: { name: "blaze", url: "https://pokeapi.co/api/v2/ability/66/" },
      is_hidden: false,
      slot: 1,
    },
  ],
  stats: [
    {
      base_stat: 39,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
  ],
  types: [
    {
      slot: 1,
      type: { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
    },
  ],
  sprites: {
    back_default: "",
    back_female: null,
    back_shiny: "",
    back_shiny_female: null,
    front_default: "",
    front_female: null,
    front_shiny: "",
    front_shiny_female: null,
    other: {
      dream_world: { front_default: "", front_female: null },
      home: {
        front_default: "",
        front_female: null,
        front_shiny: "",
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        front_shiny: "",
      },
      showdown: {
        back_default: "",
        back_female: null,
        back_shiny: "",
        back_shiny_female: null,
        front_default: "",
        front_female: null,
        front_shiny: "",
        front_shiny_female: null,
      },
    },
  },
  base_experience: 62,
  cries: { latest: "", legacy: "" },
  forms: [],
  game_indices: [],
  held_items: [],
  is_default: true,
  location_area_encounters: "",
  moves: [],
  order: 4,
  past_abilities: [],
  past_types: [],
  species: {
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon-species/4/",
  },
};

const renderPokemonDetailsCard = () => {
  return render(
    <MemoryRouter>
      <PokemonDetailsCard
        name={mockPokemonDetailsData.name}
        id={mockPokemonDetailsData.id}
        artwork={
          mockPokemonDetailsData.sprites.other["official-artwork"].front_default
        }
        types={mockPokemonDetailsData.types}
        stats={mockPokemonDetailsData.stats}
        height={mockPokemonDetailsData.height}
        weight={mockPokemonDetailsData.weight}
        abilities={mockPokemonDetailsData.abilities}
      />
    </MemoryRouter>,
  );
};

describe("PokemonDetailsCard", () => {
  test("Should render PokemonDetailsCard", () => {
    const { container } = renderPokemonDetailsCard();
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  test("should render PokemonDetailsCard with default elements", () => {
    renderPokemonDetailsCard();
    expect(screen.getByTestId("custom-header")).toBeDefined();
    expect(screen.getByTestId("pokemon-grid-card")).toBeDefined();
    expect(screen.getByRole("separator")).toBeDefined();
    expect(screen.getByTestId("badge")).toBeDefined();
    expect(screen.getByTestId("meter-group")).toBeDefined();
    expect(screen.getByTestId("button")).toBeDefined();
  });

  test("should render PokemonDetailsCard with default content", () => {
    renderPokemonDetailsCard();
    expect(screen.getByTestId("pokemon-grid-card").innerHTML).toContain(
      "charmander",
    );
    expect(screen.getByTestId("paragraph-test").innerHTML).toContain(
      "Pokemon Details",
    );
    expect(screen.getByTestId("div-types-test").innerHTML).toContain("Types:");
    expect(screen.getByTestId("span-height-test").innerHTML).toContain(
      "Height:",
    );
    expect(screen.getByTestId("span-height-test-result").innerHTML).toContain(
      "0.6 m",
    );
    expect(screen.getByTestId("span-weight-test").innerHTML).toContain(
      "Weight:",
    );
    expect(screen.getByTestId("span-weight-test-result").innerHTML).toContain(
      "8.5 kg",
    );
    expect(screen.getByTestId("div-abilities-test").innerHTML).toContain(
      "Abilities:",
    );
    expect(screen.getByTestId("paragraph-test-ability").innerHTML).toContain(
      "Blaze",
    );
    expect(screen.getByTestId("paragraph-stadistic-test").innerHTML).toContain(
      "Stadistics:",
    );
  });
});
