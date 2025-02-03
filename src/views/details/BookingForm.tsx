import { Charger } from "@/types/data";
import { Box, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

type BookingFormProps = {
  charger: Charger;
};

export default function BookingForm({ charger }: BookingFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  return (
    <Box display="flex" flexDirection="column" alignItems="baseline" gap={2}>
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
    </Box>
  );
}
