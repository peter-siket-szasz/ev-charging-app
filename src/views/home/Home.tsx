import { Box, Container } from "@mui/material";
import ChargerGrid from "@/views/home/components/ChargerGrid";
import HeaderBar from "./components/HeaderBar";

export default function Home() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" gap={2}>
        <HeaderBar />
        <ChargerGrid />
      </Box>
    </Container>
  );
}
