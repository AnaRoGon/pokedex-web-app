import { describe, expect, test } from "vitest";
import { pokedexApi } from "./pokedex.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("pokedexApi", () => {
  test("Should be configure pointing to the testing server", () => {
    expect(pokedexApi).toBeDefined();
    expect(pokedexApi.defaults.baseURL).toBe(`${BASE_URL}`);
    expect(BASE_URL).toContain("https://pokeapi.co/api/v2");
  });
});
