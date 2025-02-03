import { Booking, BookingStore } from "@/types/store";
import { create } from "zustand";

export const useBooking = create<BookingStore>((set, get) => ({
  chargers: [],

  addBooking: (chargerId: number, booking: Booking) => {
    // Find correct charger
    const state = get();
    const charger = state.chargers.find((c) => c.id === chargerId);

    // If charger doesn't exist, add it
    if (!charger) {
      set({ chargers: [...state.chargers, { id: chargerId, bookings: [] }] });
    }

    // Add booking to charger
    set({
      chargers: state.chargers.map((c) =>
        c.id === chargerId
          ? { id: c.id, bookings: [...c.bookings, booking] }
          : c,
      ),
    });
  },

  getBookings: (chargerId: number) => {
    const state = get();
    const charger = state.chargers.find((c) => c.id === chargerId);
    return charger?.bookings;
  },
}));
