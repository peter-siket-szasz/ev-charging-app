import { Box } from "@mui/material";
import ChargerCard from "./ChargerCard";
import { Charger } from "@/types/data";

type ChargerGridProps = {
  chargers: Charger[];
};

export default function ChargerGrid({ chargers }: ChargerGridProps) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
      {chargers?.map((charger) => (
        <ChargerCard key={charger.id} charger={charger} />
      ))}
    </Box>
  );
}
