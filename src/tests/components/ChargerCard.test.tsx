import { render } from "@testing-library/react";
import { parseCharger } from "@/data/parseCharger";
import { describe, expect, it } from "vitest";
import ChargerCard from "@/views/home/components/ChargerCard";
import data from "@/data/Chargers";

describe("ChargerCard", () => {
  const charger = data.map(parseCharger)[0];
  console.log(charger);
  it("should render without errors", () => {
    expect(charger).not.toBe(null);
    render(<ChargerCard charger={charger} />);
  });
});
