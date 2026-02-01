import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { pokedexApi } from "../api/pokedex.api";
import { getPokemonByTypeAction } from "./get-pokemon-by-type.action";

describe("getPokemonByTypeAction", () => {
  const pokedexApiMock = new AxiosMockAdapter(pokedexApi);
  beforeEach(() => {
    pokedexApiMock.reset();
  });

  test("should return an array of pokémon names by type", async () => {
    const type = "fire";
    const mockData = {
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
    };

    pokedexApiMock.onGet(`/type/${type}`).reply(200, mockData);
    const pokemons = await getPokemonByTypeAction(type);
    expect(pokemons).toEqual(mockData);
  });
});
