import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { appRouter } from "./app.router";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

vi.mock("../Pokedex/pages/pokedex/layouts/PokedexLayout", () => ({
  PokedexLayout: () => (
    <div data-testid="pokedex-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock("@/Pokedex/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock("../Pokedex/pages/pokedex/PokedexPage", () => ({
  PokedexPage: () => {
    const { idSlug = "" } = useParams();
    return <div data-testid="pokedex-page">PokedexPage - {idSlug}</div>;
  },
}));

vi.mock("@/Pokedex/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe("appRouter", () => {
  test("Should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test("Should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("Should render pokedex page at /Pokemon/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/Pokemon/charmander"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("pokedex-page").innerHTML).toContain(
      "charmander",
    );
  });

  test("Should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    });
    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId("search-page")).toBeDefined();
  });

  test("Should redirect to home page for unknown routes", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/another-page"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
