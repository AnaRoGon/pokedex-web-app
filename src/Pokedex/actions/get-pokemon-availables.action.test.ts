import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { pokedexApi } from "../api/pokedex.api";
import { getPokemonAvailablesAction } from "./get-pokemon-availables.action";

describe("getPokemonByPageAction", () => {
  const pokedexApiMock = new AxiosMockAdapter(pokedexApi);
  beforeEach(() => {
    pokedexApiMock.reset();
  });

  test("should return an array of pokémon names", async () => {
    const mockData = {
      count: 1350,
      next: "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10",
      previous: null,
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };

    pokedexApiMock.onGet(`pokemon/?limit=1000&offset=0`).reply(200, mockData);
    const pokemons = await getPokemonAvailablesAction();
    expect(pokemons).toEqual(["pikachu", "charmander", "bulbasaur"]);
  });
});
