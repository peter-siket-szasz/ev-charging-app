"use client";
import { Box } from "@mui/material";
import { useChargers } from "../../hooks/charger";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import HeaderBar from "./components/HeaderBar";

export default function Home() {
  const { data, error, isLoading } = useChargers();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <HeaderBar />
      <ChargerGrid chargers={data!} />
    </Box>
  );
}
