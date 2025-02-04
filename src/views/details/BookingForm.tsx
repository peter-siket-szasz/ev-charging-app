import { useBooking } from "@/hooks/useBooking";
import { Charger } from "@/types/data";
import { Booking } from "@/types/store";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import Legend from "./Legend";
import { useDisclosure } from "@/hooks/useDisclosure";
import ChipGrid from "./ChipGrid";
import SuccessToast from "./SuccessToast";

type BookingFormProps = {
  charger: Charger;
};

export default function BookingForm({ charger }: BookingFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const [requestLoading, setRequestLoading] = useState(false);

  const addBooking = useBooking((state) => state.addBooking);
  const bookings: Booking[] = useBooking((state) => state.bookings).filter(
    (b) => b.id === charger.id && b.date === date?.format("YYYY-MM-DD"),
  );

  const { isOpen: isToastOpen, open, close } = useDisclosure();

  const openHours = charger.open_hours;

  const handleChipClick = useCallback(
    (hour: number) => {
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
    },
    [startTime, endTime],
  );

  // Display instruction text based on current stage of selection
  const instruction = (() => {
    switch (true) {
      case startTime === null && endTime === null:
        return "Select starting time";
      case startTime !== null && endTime === null:
        return "Select ending time out of the available slots or confirm booking for 1 hour";
      case startTime !== null && endTime !== null:
        return "Confirm booking";
    }
  })();

  // Send API call for booking request (mock) and save to zustand state
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
      const result = await response.json();
      if (response.ok) {
        addBooking(result);
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
      <SuccessToast isOpen={isToastOpen} close={close} />
      <Typography variant="h4" component="h2">
        Booking form
      </Typography>
      <Legend />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
            setStartTime(null);
            setEndTime(null);
          }}
          label="Select booking date"
        />
      </LocalizationProvider>
      <ChipGrid
        {...{ startTime, endTime, openHours, bookings, handleChipClick }}
      />
      <Typography variant="body2" minHeight={40}>
        {instruction}
      </Typography>
      {requestLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          disabled={startTime === null || date === null}
          onClick={handleBookingClick}
        >
          Book
        </Button>
      )}
    </Box>
  );
}
