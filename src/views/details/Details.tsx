"use client";
import { useCharger } from "@/hooks/useChargers";
import { Box, CircularProgress, Typography } from "@mui/material";
import InfoGrid from "./InfoGrid";

type DetailsProps = {
  id: number;
};

export default function Details({ id }: DetailsProps) {
  const { data: charger, isLoading, error } = useCharger(id);
  return (
    <Box>
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {charger && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h3" component="h1">
            {charger.name}
          </Typography>
          <InfoGrid charger={charger} />
        </Box>
      )}
    </Box>
  );
}
