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
};
