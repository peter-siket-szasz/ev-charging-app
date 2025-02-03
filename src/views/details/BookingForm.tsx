import { useBooking } from "@/hooks/useBooking";
import { Charger } from "@/types/data";
import { Booking } from "@/types/store";
import { numberToHourFormat } from "@/utils/utils";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { isBookedAt, isBookedBetween, isOpenAt, isSelectedTime } from "./utils";
import Legend from "./Legend";
import { useDisclosure } from "@/hooks/useDisclosure";
import { CheckCircleRounded } from "@mui/icons-material";

type BookingFormProps = {
  charger: Charger;
};

export default function BookingForm({ charger }: BookingFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const { isOpen, open, close } = useDisclosure();
  const [requestLoading, setRequestLoading] = useState(false);
  const openHours = charger.open_hours;

  const addBooking = useBooking((state) => state.addBooking);

  const bookings: Booking[] = useBooking((state) => state.bookings).filter(
    (b) => b.id === charger.id && b.date === date?.format("YYYY-MM-DD"),
  );

  const handleChipClick = (hour: number) => {
    // Set start time in empty state
    if (startTime === null || startTime > hour || endTime !== null) {
      setStartTime(hour);
      setEndTime(null);
      // Reset start time on "double click"
    } else if (startTime === hour && endTime === null) {
      setStartTime(null);
      // Set end time if start is set
    } else if (startTime !== null && endTime === null) {
      setEndTime(hour);
    }
  };

  const instruction = (() => {
    switch (true) {
      case !startTime && !endTime:
        return "Select starting time";
      case startTime && !endTime:
        return "Select ending time out of the available slots or confirm booking for 1 hour";
      case !!startTime && !!endTime:
        return "Confirm booking";
    }
  })();

  const handleBookingClick = async () => {
    const booking: Booking = {
      id: charger.id,
      date: date!.format("YYYY-MM-DD"),
      startTime: startTime!,
      endTime: endTime || startTime!, // if no end time, set to start time
    };
    setRequestLoading(true);
    try {
      const response = await fetch("/api/create-booking", {
        method: "POST",
        body: JSON.stringify(booking),
      });
      // const result = await response.json();
      if (response.ok) {
        addBooking(booking);
        open();
        setStartTime(null);
        setEndTime(null);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="baseline"
      gap={2}
      maxWidth={300}
    >
      <Snackbar
        open={isOpen}
        onClose={close}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          sx={{ backgroundColor: "success.light" }}
          message={
            <Box display="flex" gap={1} alignItems="center">
              <CheckCircleRounded />
              Booking successful!
            </Box>
          }
        />
      </Snackbar>
      <Typography variant="h4" component="h2">
        Booking form
      </Typography>
      <Legend />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
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
      <Typography variant="body2" minHeight={40}>
        {instruction}
      </Typography>
      {requestLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          disabled={!startTime}
          onClick={handleBookingClick}
        >
          Book
        </Button>
      )}
    </Box>
  );
}
