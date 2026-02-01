import { act } from "react";
import { describe, expect, test } from "vitest";
import { getBackgroundColorByType } from "./get-background-color-by-type";

describe("getBackgroundColorByType", () => {
  test("Should return the correct color depending for fire", () => {
    const actualType = "Fire";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-orange-600 rounded-full p-3 pr-4 pl-4");
  });
  test("Should return the correct color depending for type normal", () => {
    const actualType = "normal";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-gray-400 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type fighting", () => {
    const actualType = "fighting";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-red-600 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type flying", () => {
    const actualType = "flying";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-indigo-300 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type poison", () => {
    const actualType = "poison";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-purple-600 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type ground", () => {
    const actualType = "ground";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-yellow-700 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type rock", () => {
    const actualType = "rock";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-yellow-800 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type bug", () => {
    const actualType = "bug";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-green-600 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type ghost", () => {
    const actualType = "ghost";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-indigo-700 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type steel", () => {
    const actualType = "steel";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-gray-500 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type water", () => {
    const actualType = "water";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-blue-600 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type grass", () => {
    const actualType = "grass";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-green-500 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type electric", () => {
    const actualType = "electric";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-yellow-400 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type psychic", () => {
    const actualType = "psychic";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-pink-500 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type ice", () => {
    const actualType = "ice";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-cyan-400 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type dragon", () => {
    const actualType = "dragon";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-purple-700 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type dark", () => {
    const actualType = "dark";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-gray-800 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type fairy", () => {
    const actualType = "fairy";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-pink-300 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type stellar", () => {
    const actualType = "stellar";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-slate-500 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color depending for type unknown", () => {
    const actualType = "unknown";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-gray-700 rounded-full p-3 pr-4 pl-4");
  });

  test("Should return the correct color if type receibed is not defined", () => {
    const actualType = "Paper";
    let color;

    act(() => {
      color = getBackgroundColorByType(actualType);
    });
    expect(color).toBe("bg-black rounded-full p-3 pr-4 pl-4");
  });
});
