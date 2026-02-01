import { Outlet, useNavigate } from "react-router";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import logotype from "/public/icons/pokemon-icon.svg";

export const PokedexLayout = () => {
  const navigate = useNavigate();

  function goToHome(): void {
    navigate("/");
  }

  const items: MenuItem[] = [
    { label: "Home", icon: "pi pi-home", url: "/" },
    {
      separator: true,
    },
    { label: "search", icon: "pi pi-search", url: "#/search" },
  ];
  const end = (
    <img
      alt="logo"
      src={logotype}
      height="40"
      className="mr-2 object-scale-down"
      onClick={() => goToHome()}
    ></img>
  );

  return (
    <>
      <div className="flex flex-col">
        <nav>
          <Menubar model={items} end={end} />
        </nav>
      </div>

      <Outlet />

      <div className="fixed bottom-0 w-full">
        <footer className="bg-orange-700 text-white text-center p-4">
          &copy; 2025 Pokedex App
        </footer>
      </div>
    </>
  );
};
