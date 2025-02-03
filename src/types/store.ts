export type Booking = {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
};

export type ChargerBooking = {
  id: number;
  bookings: Booking[];
};

export type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
};
