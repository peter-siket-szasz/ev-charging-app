import data from "@/data/Chargers";
import { parseCharger } from "@/data/parseCharger";
import { useBooking } from "@/hooks/useBooking";
import { Booking } from "@/types/store";
import BookingForm from "@/views/details/BookingForm";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

const bookings = [{ startTime: 10, endTime: 16 }] as Booking[];

// Initialize bookings
beforeEach(() => useBooking.setState({ bookings }));

describe("BookingForm", () => {
  const charger = data.map(parseCharger)[2]; // Select a charger without 24/7 availability
  it("should render without errors", () => {
    render(<BookingForm charger={charger} />);
  });
  it("should render the legend", () => {
    render(<BookingForm charger={charger} />);
    const types = ["Available", "Booked", "Selected", "Closed"];
    types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });
  it("should render a chip for each hour", () => {
    render(<BookingForm charger={charger} />);
    expect(screen.getAllByText(/\d{2}:\d{2}/)).toHaveLength(24);
  });
  // MUI elements are difficult to test with RTL
  // Todo: verify different types of chips being rendered
  it("should render the booking button", () => {
    render(<BookingForm charger={charger} />);
    expect(screen.getByText("Book")).toBeInTheDocument();
  });
});
