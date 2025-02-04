import { Booking } from "@/types/store";
import { Box, Chip } from "@mui/material";
import {
  isBookedAt,
  isBookedBetween,
  isOpenAt,
  isSelectedTime,
  numberToHourFormat,
} from "./utils";

type ChipGridProps = {
  startTime: number | null;
  endTime: number | null;
  openHours: number[];
  bookings: Booking[];
  handleChipClick: (hour: number) => void;
};

export default function ChipGrid({
  startTime,
  endTime,
  openHours,
  bookings,
  handleChipClick,
}: ChipGridProps) {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {Array.from({ length: 24 }).map((_, hour) => (
        <Chip
          key={hour}
          label={numberToHourFormat(hour)}
          variant={isOpenAt(hour, openHours) ? "filled" : "outlined"}
          color={
            //A bit unclean to nest ternaries like this but there's not that many paths for now
            isSelectedTime(hour, startTime, endTime)
              ? "success"
              : isOpenAt(hour, openHours) && !isBookedAt(hour, bookings)
                ? "primary"
                : isBookedAt(hour, bookings)
                  ? "error"
                  : "default"
          }
          disabled={
            !isOpenAt(hour, openHours) ||
            isBookedAt(hour, bookings) ||
            (!!startTime && isBookedBetween(startTime, hour, bookings))
          }
          onClick={() => handleChipClick(hour)}
        />
      ))}
    </Box>
  );
}
