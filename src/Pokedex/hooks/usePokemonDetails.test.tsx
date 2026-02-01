import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getPokemonDetailsByNameAction } from "../actions/get-pokemon-details-by-name.action";
import { usePokemonDetails } from "./usePokemonDetails";

vi.mock("../actions/get-pokemon-details-by-name.action", () => ({
  getPokemonDetailsByNameAction: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockPokemonDetailsByNameAction = vi.mocked(getPokemonDetailsByNameAction);

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemonDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePokemonDetails("charmander"), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("Should return succes state with data when API call succeds", async () => {
    const mockPokemonDetailsData = {
      name: "charmander",
      id: 4,
      height: 6,
      weight: 85,
      abilities: [
        {
          ability: {
            name: "blaze",
            url: "https://pokeapi.co/api/v2/ability/66/",
          },
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

    mockPokemonDetailsByNameAction.mockResolvedValue(mockPokemonDetailsData);

    const { result } = renderHook(() => usePokemonDetails("charmander"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockPokemonDetailsByNameAction).toHaveBeenCalled();
    expect(mockPokemonDetailsByNameAction).toHaveBeenCalledWith("charmander");
  });

  test("Should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch an array of Pokemons names");
    mockPokemonDetailsByNameAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonDetails(""), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockPokemonDetailsByNameAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe(
      "Failed to fetch an array of Pokemons names",
    );
  });
});
