export type Booking = {
  date: string;
  startTime: number;
  endTime: number;
};

export type ChargerBooking = {
  id: number;
  bookings: Booking[];
};

export type BookingStore = {
  chargers: ChargerBooking[];
  addBooking: (chargerId: number, booking: Booking) => void;
  getBookings: (chargerId: number) => Booking[] | undefined;
};
