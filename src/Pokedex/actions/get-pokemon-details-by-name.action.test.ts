import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { pokedexApi } from "../api/pokedex.api";
import { getPokemonDetailsByNameAction } from "./get-pokemon-details-by-name.action";

describe("getPokemonDetailsByNameAction", () => {
  const pokedexApiMock = new AxiosMockAdapter(pokedexApi);
  beforeEach(() => {
    pokedexApiMock.reset();
  });

  test("should return the details of a pokémon by the name received as idSlug", async () => {
    const idSlug = "charmander";
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

    pokedexApiMock.onGet(`pokemon/${idSlug}`).reply(200, mockData);
    const pokemons = await getPokemonDetailsByNameAction(idSlug);
    expect(pokemons).toEqual(mockData);
  });
});
