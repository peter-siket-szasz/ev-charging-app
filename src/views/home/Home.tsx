"use client";
import { Box, CircularProgress } from "@mui/material";
import { useChargers } from "../../hooks/charger";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import HeaderBar from "./components/HeaderBar";
import { useQueryState } from "nuqs";

export default function Home() {
  const [sort] = useQueryState("sort", { defaultValue: "" });
  const { data, error, isLoading } = useChargers({ sort });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <HeaderBar />
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && data && <ChargerGrid chargers={data} />}
    </Box>
  );
}
