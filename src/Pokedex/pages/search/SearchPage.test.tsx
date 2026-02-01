import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonAvailables } from "@/Pokedex/hooks/usePokemonAvailables";
import { usePokemonByType } from "@/Pokedex/hooks/usePokemonByType";
import SearchPage from "./SearchPage";

vi.mock("@/Pokedex/hooks/usePokemonByType");

vi.mock("@/Pokedex/hooks/usePokemonAvailables");

const mockUsePokemonAvailables = vi.mocked(usePokemonAvailables);
const mockUsePokemonByType = vi.mocked(usePokemonByType);

mockUsePokemonByType.mockReturnValue({
  data: { pokemon: [] },
} as unknown as ReturnType<typeof usePokemonByType>);

mockUsePokemonAvailables.mockReturnValue({
  data: [],
} as unknown as ReturnType<typeof usePokemonAvailables>);

vi.mock("@/components/custom/CustomHeader", () => ({
  CustomHeader: () => <div data-testid="custom-header"></div>,
}));

vi.mock("primereact/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));

vi.mock("primereact/button", () => ({
  Button: () => <div data-testid="button"></div>,
}));

vi.mock("@/Pokedex/components/PokemonGrid", () => ({
  PokemonGrid: ({ pokemonsName }: { pokemonsName: string[] }) => (
    <div data-testid="pokemon-grid">
      {pokemonsName.map((pokemon) => (
        <div data-testid="pokemon-name" key={pokemon}>
          {pokemon}
        </div>
      ))}
    </div>
  ),
}));

const queryClient = new QueryClient();

const renderSearchPage = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should render SearchPage with initial values", () => {
    renderSearchPage();
    expect(mockUsePokemonAvailables).toHaveBeenCalledWith();
    expect(mockUsePokemonByType).toHaveBeenCalledWith("all");
  });

  test("Should contain a CustomHeader", () => {
    renderSearchPage();
    expect(screen.getByTestId("custom-header")).toBeDefined();
  });

  test("Should contain a Card", () => {
    renderSearchPage();
    expect(screen.getByTestId("card")).toBeDefined();
  });

  test("Should contain a paragraph if filteredPokemon.lenght equals 0", () => {
    renderSearchPage();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(
      screen.getByText(
        "No se han encontrado Pokémon que correspondan con esta búsqueda",
      ),
    );
  });

  test("Should contain a Toolbar", () => {
    renderSearchPage();
    expect(screen.getByRole("toolbar")).toBeDefined();
  });

  test("Should call pokemonByTypeAction with type parameter from sessionStorage", () => {
    sessionStorage.setItem("type-state", "fire");
    renderSearchPage();
    expect(mockUsePokemonByType).toHaveBeenCalledWith("fire");
  });

  test("Should call pokemonByTypeAction with 'all' when type in sessionStorage is not a type of pokemon", () => {
    sessionStorage.setItem("type-state", "fkk");
    renderSearchPage();
    expect(mockUsePokemonByType).toHaveBeenCalledWith("all");
  });

  test("Should call pokemonByTypeAction with the correct parameters type from sessionStorage", () => {
    sessionStorage.setItem("type-state", "water");
    renderSearchPage();
    expect(mockUsePokemonByType).toHaveBeenCalledWith("water");
  });

  test("Should display only the pokémon that matches the search query", async () => {
    mockUsePokemonAvailables.mockReturnValue({
      data: ["pikachu", "bulbasaur"],
    } as unknown as ReturnType<typeof usePokemonAvailables>);

    renderSearchPage();

    const input = screen.getByTestId("search-input-test");

    fireEvent.change(input, { target: { value: "pika" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(await screen.getByTestId("pokemon-name").innerHTML).toContain(
      "pikachu",
    );
  });
});
