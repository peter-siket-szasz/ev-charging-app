import { Box, Typography } from "@mui/material";
import Sorting from "./Sorting";

export default function HeaderBar() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Typography variant="h3" component="h1">
        Charging stations
      </Typography>
      <Box display="flex" gap={2}>
        <Sorting />
        <Box>
          <Typography variant="h6" component="h2">
            Filter:{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
