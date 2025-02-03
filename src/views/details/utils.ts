import { Booking } from "@/types/store";

export function isOpenAt(hour: number, openHours: number[]) {
  return hour >= (openHours.at(0) || 0) && hour <= (openHours.at(-1) || 23);
}

export function isBookedAt(hour: number, bookings: Booking[]) {
  return bookings.some(
    (booking) => booking.startTime <= hour && booking.endTime > hour,
  );
}
