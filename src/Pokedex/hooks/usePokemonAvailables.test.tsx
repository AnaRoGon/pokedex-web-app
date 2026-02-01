import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonAvailables } from "./usePokemonAvailables";
import { getPokemonAvailablesAction } from "../actions/get-pokemon-availables.action";

vi.mock("../actions/get-pokemon-availables.action", () => ({
  getPokemonAvailablesAction: vi.fn(),
}));

const mockGetPokemonAvailables = vi.mocked(getPokemonAvailablesAction);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, //Solo hace una petición, si falla sale
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemonAvailables", () => {
  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePokemonAvailables(), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("Should return success state with data when API call succeeds", async () => {
    const mockPokemonAvailablesData = ["charizard", "charmeleon", "charmander"];
    mockGetPokemonAvailables.mockResolvedValue(mockPokemonAvailablesData);

    const { result } = renderHook(() => usePokemonAvailables(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.isError).toBe(false);
    expect(mockGetPokemonAvailables).toHaveBeenCalled();
  });

  test("Should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch an array of Pokemons names");
    mockGetPokemonAvailables.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonAvailables(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetPokemonAvailables).toHaveBeenCalled();
    expect(result.current.error?.message).toBe(
      "Failed to fetch an array of Pokemons names",
    );
  });
});
