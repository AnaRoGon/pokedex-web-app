import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PokemonGrid } from "./PokemonGrid";

const pokemonNames = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "eevee",
];

vi.mock("./PokemonGridCard", () => ({
  PokemonGridCard: ({ name }: { name: string }) => (
    <div data-testid="pokemon-grid-card">{name}</div>
  ),
}));

vi.mock("primereact/paginator", () => ({
  Paginator: () => <div data-testid="paginator"></div>,
}));

describe("PokemonGrid", () => {
  const defaultProps = {
    first: 0,
    rows: 20,
    onPageChange: vi.fn(),
    pokemonsName: pokemonNames,
  };

  test("Should render the component with defaults elements if an array of pokemon names is received", () => {
    const { container } = render(<PokemonGrid {...defaultProps} />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  test("Should render with default elements if and array of pokemon names is received", () => {
    render(<PokemonGrid {...defaultProps} />);
    expect(screen.getAllByTestId("pokemon-grid-card")).toBeDefined();
    expect(screen.getByTestId("paginator")).toBeDefined();
  });

  test("Should render an amount of PokemonGridCard for every pokemon names received", () => {
    render(<PokemonGrid {...defaultProps} />);
    const pokemonGridCard = screen.getAllByTestId("pokemon-grid-card");
    expect(pokemonGridCard.length).toBe(5);
    expect(pokemonGridCard[0].innerHTML).toContain("pikachu");
    expect(pokemonGridCard[1].innerHTML).toContain("bulbasaur");
    expect(pokemonGridCard[2].innerHTML).toContain("charmander");
    expect(pokemonGridCard[3].innerHTML).toContain("squirtle");
    expect(pokemonGridCard[4].innerHTML).toContain("eevee");
  });

  test("Should not render a PokemonGridCard when the array of pokemon names is empty", () => {
    render(<PokemonGrid {...defaultProps} pokemonsName={[]} />);
    expect(screen.queryAllByTestId("pokemon-grid-card")).toHaveLength(0);
  });

  test("Should render a Paginator when the array of pokemon names is empty", () => {
    render(<PokemonGrid {...defaultProps} pokemonsName={[]} />);
    expect(screen.getByTestId("paginator")).toBeDefined();
  });
});
