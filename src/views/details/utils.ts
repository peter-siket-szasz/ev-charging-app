import { Booking } from "@/types/store";

export function isOpenAt(hour: number, openHours: number[]) {
  return hour >= (openHours.at(0) || 0) && hour <= (openHours.at(-1) || 23);
}

export function isBookedAt(hour: number, bookings: Booking[]) {
  return bookings.some(
    (booking) => booking.startTime <= hour && booking.endTime >= hour,
  );
}

export function isBookedBetween(
  start: number,
  end: number,
  bookings: Booking[],
) {
  const hours = Array.from({ length: end - start + 1 }).map(
    (_, i) => i + start,
  );
  return hours.some((hour) => isBookedAt(hour, bookings));
}

export function isSelectedTime(
  hour: number,
  start: number | null,
  end: number | null,
) {
  return start === hour || (start && end && hour >= start && hour <= end);
}
