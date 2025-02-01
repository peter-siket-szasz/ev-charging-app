"use client";
import { Box, Typography } from "@mui/material";
import { useChargers } from "../../hooks/charger";
import ChargerGrid from "@/components/charger/ChargerGrid";

export default function Home() {

  const { data, error, isLoading } = useChargers();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="h3" component="h1">Chargers</Typography>
      <ChargerGrid chargers={data!} />
    </Box>
  );
}
