import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";

vi.mock("@/components/custom/CustomHeader", () => ({
  CustomHeader: () => <div data-testid="custom-header"></div>,
}));

vi.mock("primereact/button", () => ({
  Button: () => <div data-testid="Button"></div>,
}));

const renderHomePage = () => {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  test("Should render HomePage", () => {
    const { container } = renderHomePage();
    expect(container).toBeDefined();
  });

  test("Should contain a CustomHeader", () => {
    renderHomePage();
    expect(screen.getByTestId("custom-header")).toBeDefined();
  });

  test("Should contain a Button", () => {
    renderHomePage();
    expect(screen.getByTestId("Button")).toBeDefined();
  });
});
