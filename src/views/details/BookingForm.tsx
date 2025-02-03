import { useBooking } from "@/hooks/useBooking";
import { Charger } from "@/types/data";
import { Booking } from "@/types/store";
import { numberToHourFormat } from "@/utils/utils";
import { Box, Chip, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { isBookedAt, isOpenAt } from "./utils";

type BookingFormProps = {
  charger: Charger;
};

export default function BookingForm({ charger }: BookingFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const openHours = charger.open_hours;

  const bookings: Booking[] = useBooking((state) =>
    state.getBookings(charger.id),
  ) || [{ date: "asd", startTime: 8, endTime: 10 }];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      gap={2}
      maxWidth={300}
    >
      <Typography variant="h4" component="h2">
        Booking form
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          label="Select booking date"
        />
      </LocalizationProvider>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {Array.from({ length: 24 }).map((_, hour) => (
          <Chip
            key={hour}
            label={numberToHourFormat(hour)}
            variant={isOpenAt(hour, openHours) ? "filled" : "outlined"}
            color={
              isOpenAt(hour, openHours) && !isBookedAt(hour, bookings)
                ? "primary"
                : isBookedAt(hour, bookings)
                  ? "error"
                  : "default"
            }
            disabled={!isOpenAt(hour, openHours)}
          />
        ))}
      </Box>
    </Box>
  );
}
