"use client";
import { Box, CircularProgress } from "@mui/material";
import { useChargers } from "../../hooks/charger";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import HeaderBar from "./components/HeaderBar";
import { useQueryState } from "nuqs";

export default function Home() {
  const [sort] = useQueryState("sort", { defaultValue: "" });
  const { data, error, isLoading } = useChargers({ sort });

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        height="100%"
      >
        <CircularProgress />
        Loading...
      </Box>
    );
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
