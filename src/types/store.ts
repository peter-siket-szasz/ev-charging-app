export type Booking = {
  id: number;
  date: string;
  startTime: number;
  endTime: number;
};

export type BookingStore = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
};
