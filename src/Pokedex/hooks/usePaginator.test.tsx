import { act, renderHook } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { usePaginator } from "@/Pokedex/hooks/usePaginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";

describe("usePaginator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Should initialize with default pagination values if sessionStorage is empty", () => {
    const { result } = renderHook(() => usePaginator());
    expect(result.current.first).toBe(0);
    expect(result.current.rows).toBe(20);
  });

  test("Should initialize with values from sessionStorage if available", () => {
    sessionStorage.setItem("first-state", "40");
    const { result } = renderHook(() => usePaginator());
    expect(result.current.first).toBe(40);
  });

  test("Should update first and rows when onPageChange is called", () => {
    const { result } = renderHook(() => usePaginator());

    act(() => {
      result.current.onPageChange({
        first: 20,
        rows: 10,
      } as PaginatorPageChangeEvent);
    });

    expect(result.current.first).toBe(20);
    expect(result.current.rows).toBe(10);
  });

  test("Should update sessionStorage when first changes", () => {
    const { result } = renderHook(() => usePaginator());

    act(() => {
      result.current.setFirst(60);
    });

    expect(sessionStorage.getItem("first-state")).toBe("60");
  });
});
