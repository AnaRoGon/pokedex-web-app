import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getPokemonByTypeAction } from "../actions/get-pokemon-by-type.action";
import type { PokemonTypeResponse } from "../types/get-pokemons-by-type";
import { usePokemonByType } from "./usePokemonByType";

vi.mock("../actions/get-pokemon-by-type.action", () => ({
  getPokemonByTypeAction: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockPokemonByTypeAction = vi.mocked(getPokemonByTypeAction);

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemonByType", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePokemonByType("fire"), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("Should return succes state with data when API call succeds", async () => {
    const mockPokemonByTypeData = {
      pokemon: [
        {
          pokemon: {
            name: "charmander",
            url: "https://pokeapi.co/api/v2/pokemon/4/",
          },
          slot: 1,
        },
        {
          pokemon: {
            name: "charmeleon",
            url: "https://pokeapi.co/api/v2/pokemon/5/",
          },
          slot: 1,
        },
        {
          pokemon: {
            name: "charizard",
            url: "https://pokeapi.co/api/v2/pokemon/6/",
          },
          slot: 1,
        },
      ],
    } as PokemonTypeResponse;

    mockPokemonByTypeAction.mockResolvedValue(mockPokemonByTypeData);

    const { result } = renderHook(() => usePokemonByType("fire"), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockPokemonByTypeAction).toHaveBeenCalled();
    expect(mockPokemonByTypeAction).toHaveBeenCalledWith("fire");
  });

  test("Should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch an array of Pokemons names");
    mockPokemonByTypeAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonByType(""), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockPokemonByTypeAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe(
      "Failed to fetch an array of Pokemons names",
    );
  });
});
