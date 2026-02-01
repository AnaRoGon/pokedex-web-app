import type { Result } from "./pokemon-result.interface";

export interface PokemonResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}
