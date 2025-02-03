import { Box, Chip, Typography } from "@mui/material";

type ChipType = {
  color?: "primary" | "success" | "error";
  label: string;
  outlined?: boolean;
  disabled?: boolean;
};

const chips: ChipType[] = [
  { color: undefined, label: "Closed", outlined: true, disabled: true },
  { color: "primary", label: "Available" },
  { color: "success", label: "Selected" },
  { color: "error", label: "Booked", disabled: true },
];

export default function Legend() {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {chips.map((chip) => (
        <Box display="flex" alignItems="center" gap={1} key={chip.label}>
          <Chip
            size="small"
            sx={{ aspectRatio: 1 }}
            variant={chip.outlined ? "outlined" : undefined}
            color={chip.color}
            disabled={chip.disabled}
          />
          <Typography variant="body1">{chip.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
