import data from "@/data/Chargers";
import { parseCharger } from "@/data/parseCharger";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ChargerGrid", () => {
  const chargers = data.map(parseCharger);
  it("should render without errors", () => {
    render(<ChargerGrid chargers={chargers} />);
  });
  it("should render all chargers", () => {
    const { container } = render(<ChargerGrid chargers={chargers} />);
    expect(container.querySelectorAll(".MuiCard-root")).toHaveLength(
      chargers.length,
    );
  });
});
