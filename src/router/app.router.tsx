import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";
import { PokedexLayout } from "../Pokedex/pages/pokedex/layouts/PokedexLayout";
import { HomePage } from "@/Pokedex/pages/home/HomePage";
import { PokedexPage } from "@/Pokedex/pages/pokedex/PokedexPage";

// const SearchPage = lazy(() => import('@/Pokedex/pages/search/SearchPage'));
const SearchPage = lazy(() => import("@/Pokedex/pages/search/SearchPage"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <PokedexLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "Pokemon/:idSlug",
        element: <PokedexPage />,
      },

      {
        path: "search",
        element: <SearchPage />,
      },

      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);
