"use client";
import { Box, CircularProgress } from "@mui/material";
import ChargerCard from "./ChargerCard";
import { useChargers } from "@/hooks/useChargers";
import { useSearchParams } from "next/navigation";

export default function ChargerGrid() {
  const searchParams = useSearchParams();
  const { data: chargers, error, isLoading } = useChargers(searchParams);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {chargers &&
        chargers.map((charger) => (
          <ChargerCard key={charger.id} charger={charger} />
        ))}
    </Box>
  );
}
