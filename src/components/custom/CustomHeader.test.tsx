import { describe, test, expect } from "vitest";

import { render, screen } from "@testing-library/react";

import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test title";

  test("Shoul render component properly", () => {
    const { container } = render(<CustomHeader title={title} />);
    expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });

  test("Should render the title correctly", () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test("Should render the subtitle correctly", () => {
    const subtitle = "Test subtitle";
    render(<CustomHeader title={title} subtitle={subtitle} />);

    expect(screen.getByText(subtitle)).toBeDefined();
  });

  test("Should render the logotype correctly", () => {
    const logotype = "url/testing/img.png";
    const { container } = render(
      <CustomHeader title={title} logotype={logotype} />,
    );

    const img = container.querySelector("image");
    expect(img).toBeDefined();
  });

  test("Should not render subtitle when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    const h2 = container.querySelector("h2");
    expect(h2).toBeNull();
  });

  test("Should not render logotype when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);

    const img = container.querySelector("image");
    expect(img).toBeNull();
  });
});
