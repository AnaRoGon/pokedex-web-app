import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { PokeApp } from "./PokeApp";

describe("PokeApp", () => {
  test("Shoul render component properly", () => {
    const { container } = render(<PokeApp />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
});
