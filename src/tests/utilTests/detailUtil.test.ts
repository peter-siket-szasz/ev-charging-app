import { Booking } from "@/types/store";
import {
  isBookedAt,
  isBookedBetween,
  isOpenAt,
  isSelectedTime,
} from "@/views/details/utils";
import { describe, expect, it } from "vitest";

describe("detailUtils", () => {
  describe("isOpenAt", () => {
    const openHours = [1, 2, 3, 4, 5, 6, 7, 8];
    it("correctly identify if a charger is open at a given time", () => {
      expect(isOpenAt(1, openHours)).toBe(true);
      expect(isOpenAt(5, openHours)).toBe(true);
      expect(isOpenAt(8, openHours)).toBe(true);
    });
    it("correctly identify if a charger is closed at a given time", () => {
      expect(isOpenAt(0, openHours)).toBe(false);
      expect(isOpenAt(9, openHours)).toBe(false);
      expect(isOpenAt(-123, openHours)).toBe(false);
    });
  });

  describe("isBookedAt", () => {
    const bookings = [
      { startTime: 1, endTime: 3 },
      { startTime: 5, endTime: 7 },
    ] as Booking[];
    it("correctly identify if a charger is booked at a given time", () => {
      expect(isBookedAt(1, bookings)).toBe(true);
      expect(isBookedAt(5, bookings)).toBe(true);
      expect(isBookedAt(7, bookings)).toBe(true);
    });
    it("correctly identify if a charger is not booked at a given time", () => {
      expect(isBookedAt(0, bookings)).toBe(false);
      expect(isBookedAt(4, bookings)).toBe(false);
      expect(isBookedAt(16, bookings)).toBe(false);
    });
  });

  describe("isBookedBetween", () => {
    const bookings = [
      { startTime: 1, endTime: 3 },
      { startTime: 5, endTime: 7 },
    ] as Booking[];
    it("correctly identify if a charger is booked between two times", () => {
      expect(isBookedBetween(0, 2, bookings)).toBe(true);
      expect(isBookedBetween(4, 8, bookings)).toBe(true);
      expect(isBookedBetween(0, 23, bookings)).toBe(true);
    });
    it("correctly identify if a charger is not booked between two times", () => {
      expect(isBookedBetween(0, 0, bookings)).toBe(false);
      expect(isBookedBetween(4, 4, bookings)).toBe(false);
      expect(isBookedBetween(8, 16, bookings)).toBe(false);
    });
  });

  describe("isSelectedTime", () => {
    it("correctly identify if a time is selected", () => {
      // Function call -> (hour, start, end)
      expect(isSelectedTime(1, 1, 15)).toBe(true);
      expect(isSelectedTime(10, 1, 15)).toBe(true);
      expect(isSelectedTime(15, 1, 15)).toBe(true);
    });
    it("correctly identify if a time is not selected", () => {
      expect(isSelectedTime(0, 1, 3)).toBe(false);
      expect(isSelectedTime(4, 1, 3)).toBe(false);
      expect(isSelectedTime(16, 1, 3)).toBe(false);
    });
  });
});
