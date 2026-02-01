import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import logotype from "/public/img/logotype.png";
import { CustomHeader } from "@/components/custom/CustomHeader";

export const HomePage = () => {
  const navigate = useNavigate();
  function goToPokedex(): void {
    navigate("/search");
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 mask-t-from-5% opacity-40 bg-[url('/img/background.png')] bg-cover bg-center bg-no-repeat" />

      <div className="flex flex-1 flex-row items-center justify-center text-center p-10">
        <div className="max-w-6xl space-y-10">
          <CustomHeader
            title="WELCOME TO THE WORLD OF"
            subtitle="Ready to explore them all?"
            logotype={logotype}
            color="text-white"
          />

          <div className="relative w-fit h-fit inline-block leading-5 m-10">
            <div className="absolute -inset-2 bg-linear-to-r from-red-600 to-yellow-400 rounded-lg blur opacity-30"></div>
            <div className="animate-fade-up animation-delay-400 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="large" onClick={() => goToPokedex()}>
                Let's Go!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
