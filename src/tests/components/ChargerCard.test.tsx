import { render, screen } from "@testing-library/react";
import { parseCharger } from "@/data/parseCharger";
import { describe, expect, it } from "vitest";
import ChargerCard from "@/views/home/components/ChargerCard";
import data from "@/data/Chargers";

describe("ChargerCard", () => {
  const charger = data.map(parseCharger)[0];
  it("should render without errors", () => {
    expect(charger).not.toBe(null);
    render(<ChargerCard charger={charger} />);
  });
  it("should render the name of the charger", () => {
    render(<ChargerCard charger={charger} />);
    expect(screen.getByText(charger.name)).toBeInTheDocument();
  });
  it("should render a link to the details page", () => {
    render(<ChargerCard charger={charger} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", `${charger.id}`);
  });
});
