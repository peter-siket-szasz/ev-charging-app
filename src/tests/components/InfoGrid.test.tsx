import data from "@/data/Chargers";
import { parseCharger } from "@/data/parseCharger";
import InfoGrid from "@/views/details/InfoGrid";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("InfoGrid", () => {
  const charger = data.map(parseCharger)[0];
  it("should render without errors", () => {
    render(<InfoGrid charger={charger} />);
  });
  it("should render all info", () => {
    render(<InfoGrid charger={charger} />);

    expect(screen.getByText(charger.name)).toBeInTheDocument();
    expect(screen.getByText(charger.location)).toBeInTheDocument();

    expect(screen.getByText("Power")).toBeInTheDocument();
    expect(screen.getByText(`${charger.power}kW`)).toBeInTheDocument();

    expect(screen.getByText("Connectors")).toBeInTheDocument();
    expect(screen.getByText(charger.connectors.join(", "))).toBeInTheDocument();
  });
});
