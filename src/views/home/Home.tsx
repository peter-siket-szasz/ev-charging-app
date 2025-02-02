"use client";
import { Box, CircularProgress } from "@mui/material";
import { useChargers } from "../../hooks/useChargers";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import HeaderBar from "./components/HeaderBar";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useChargers(searchParams);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <HeaderBar />
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && data && <ChargerGrid chargers={data} />}
    </Box>
  );
}
