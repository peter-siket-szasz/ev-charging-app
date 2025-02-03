import { Booking, BookingStore } from "@/types/store";
import { create } from "zustand";

export const useBooking = create<BookingStore>((set, get) => ({
  chargers: [],

  addBooking: (chargerId: number, booking: Booking) => {
    // Find correct charger
    const chargers = get().chargers;
    const charger = chargers.find((c) => c.id === chargerId);

    // If charger doesn't exist, add it
    if (!charger) {
      set({ chargers: [...chargers, { id: chargerId, bookings: [] }] });
    }

    // Add booking to charger
    set({
      chargers: chargers.map((c) =>
        c.id === chargerId
          ? { id: c.id, bookings: [...c.bookings, booking] }
          : c,
      ),
    });
  },

  getBookings: (chargerId: number) => {
    const charger = get().chargers.find((c) => c.id === chargerId);
    return charger ? charger.bookings : [];
  },
}));
