import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { PokedexLayout } from "./PokedexLayout";

vi.mock("primereact/menubar", () => ({
  Menubar: () => <div data-testid="MenuBar"></div>,
}));

const renderPokedexLayout = () => {
  return render(
    <MemoryRouter>
      <PokedexLayout />
    </MemoryRouter>,
  );
};

describe("PokedexLayout", () => {
  test("Should render PokedexLayout", () => {
    const { container } = renderPokedexLayout();
    expect(container).toBeDefined();
  });

  test("Should contain a MenuBar", () => {
    renderPokedexLayout();
    expect(screen.getByTestId("MenuBar")).toBeDefined();
  });

  test("Should contain a Footer", () => {
    renderPokedexLayout();
    expect(screen.getByRole("contentinfo")).toBeDefined();
  });
});
