import { numberToHourFormat } from "@/utils/utils";
import { describe, expect, it } from "vitest";

describe("utils", () => {
  describe("numberToHourFormat", () => {
    it("should convert a number to a string in hour format", () => {
      expect(numberToHourFormat(1)).toBe("01:00");
      expect(numberToHourFormat(5)).toBe("05:00");
      expect(numberToHourFormat(18)).toBe("18:00");
    });
  });
});
