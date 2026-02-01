import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { PokemonGridCard } from "./PokemonGridCard";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import type { PokemonDetailsResponse } from "../types/get-pokemons-details";

vi.mock("../hooks/usePokemonDetails", () => {
  return {
    usePokemonDetails: vi.fn(),
  };
});

vi.mock("primereact/fieldset", () => ({
  Fieldset: () => <div data-testid="fieldset"></div>,
}));

vi.mock("primereact/card", () => ({
  Card: () => <div data-testid="card"></div>,
}));

vi.mock("primereact/progressspinner", () => ({
  ProgressSpinner: () => <div data-testid="progress-spinner"></div>,
}));

const mockUsePokemonDetails = vi.mocked(usePokemonDetails);

const mockPokemonData = {
  name: "pikachu",
  id: 5,
  artwork: "https://pokeapi.co/api/v2/pokemon/25/",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderPokemonGridCard = (
  mockPokemonData?: Partial<PokemonDetailsResponse>,
) => {
  if (mockPokemonData) {
    mockUsePokemonDetails.mockReturnValue({
      data: mockPokemonData,
    } as unknown as ReturnType<typeof usePokemonDetails>);
  } else {
    mockUsePokemonDetails.mockReturnValue({
      data: undefined,
    } as unknown as ReturnType<typeof usePokemonDetails>);
  }

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <PokemonGridCard name={mockPokemonData?.name ?? ""} />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("PokemonGridCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("should render component if usePokemonDetails return data", () => {
    const { container } = renderPokemonGridCard(mockPokemonData);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  test("should render component with default elements if usePokemonDetails return data", () => {
    renderPokemonGridCard(mockPokemonData);
    expect(screen.getByTestId("fieldset")).toBeDefined();
    expect(screen.getByTestId("card")).toBeDefined();
  });

  test("Should render a ProgresiveSpinner if usePokemonDetails return no data", () => {
    renderPokemonGridCard();
    expect(screen.getByTestId("progress-spinner")).toBeDefined();
  });
});
