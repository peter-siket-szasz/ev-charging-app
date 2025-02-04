"use client";
import { Box } from "@mui/material";
import ChargerCard from "./ChargerCard";
import { useChargers } from "@/hooks/useChargers";
import { useSearchParams } from "next/navigation";
import ChargerGridSkeleton from "./ChargerGridSkeleton";

export default function ChargerGrid() {
  const searchParams = useSearchParams();
  const { data: chargers, error, isLoading } = useChargers(searchParams);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
      {/* Using React Suspense is not recommended with data frameworks such as SWR:
          https://swr.vercel.app/docs/suspense */}
      {isLoading && <ChargerGridSkeleton />}
      {error && <div>Error: {error.message}</div>}
      {chargers &&
        chargers.map((charger) => (
          <ChargerCard key={charger.id} charger={charger} />
        ))}
    </Box>
  );
}
