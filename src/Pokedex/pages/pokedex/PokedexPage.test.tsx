import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonDetails } from "@/Pokedex/hooks/usePokemonDetails";
import { PokedexPage } from "./PokedexPage";

vi.mock("@/Pokedex/hooks/usePokemonDetails");

vi.mock("@/Pokedex/components/PokemonDetailsCard", () => ({
  PokemonDetailsCard: () => <div data-testid="pokemon-details-card"></div>,
}));

vi.mock("primereact/progressspinner", () => ({
  ProgressSpinner: () => <div data-testid="progress-spinner"></div>,
}));

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate" data-to={to} />
    ),
  };
});

const mockUsePokemonDetails = vi.mocked(usePokemonDetails);

const mockData = {
  abilities: [
    {
      ability: {
        name: "blaze",
        url: "https://pokeapi.co/api/v2/ability/66/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "solar-power",
        url: "https://pokeapi.co/api/v2/ability/94/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  base_experience: 62,
  name: "charmander",
  order: 5,
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png",
      },
    },
  },
  height: 6,
  weight: 85,
};

const queryClient = new QueryClient();

const renderPokedexPage = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <PokedexPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  test("Should render PokedexPage", () => {
    mockUsePokemonDetails.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof usePokemonDetails>);
    const { container } = renderPokedexPage();
    expect(container).toBeDefined();
  });

  test("Should render PokemonDetailsCard when usePokemonDetails returns data", () => {
    mockUsePokemonDetails.mockReturnValue({
      data: mockData,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    renderPokedexPage();
    expect(screen.getByTestId("pokemon-details-card")).toBeDefined();
  });

  test("Should render PokemonDetailsCard if usePokemonDetails is loading", () => {
    mockUsePokemonDetails.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    renderPokedexPage();
    expect(screen.getAllByTestId("progress-spinner")).toBeDefined();
  });

  test("Should redirect to home page when usePokemonDetails returns error", () => {
    mockUsePokemonDetails.mockReturnValue({
      data: undefined,
      isError: true,
    } as unknown as ReturnType<typeof usePokemonDetails>);

    renderPokedexPage();
    expect(screen.getByTestId("navigate")).toBeDefined();
  });
});
