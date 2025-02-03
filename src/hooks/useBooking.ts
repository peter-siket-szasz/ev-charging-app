import { Booking, BookingStore } from "@/types/store";
import { create } from "zustand";

export const useBooking = create<BookingStore>((set) => ({
  bookings: [],

  addBooking: (booking: Booking) => {
    set((state) => ({ bookings: [...state.bookings, booking] }));
  },
}));
