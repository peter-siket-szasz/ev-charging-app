import { Box, Typography } from "@mui/material";
import Sorting from "./Sorting";
import Filtering from "./Filtering";

export default function HeaderBar() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h3" component="h1">
        Charging stations
      </Typography>
      <Box display="flex" gap={2}>
        <Sorting />
        <Filtering />
      </Box>
    </Box>
  );
}
