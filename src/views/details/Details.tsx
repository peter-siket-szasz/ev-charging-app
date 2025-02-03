"use client";
import { useCharger } from "@/hooks/useChargers";
import { Box, CircularProgress, Container } from "@mui/material";
import InfoGrid from "./InfoGrid";
import BookingForm from "./BookingForm";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { ArrowLeft } from "@mui/icons-material";

type DetailsProps = {
  id: number;
};

export default function Details({ id }: DetailsProps) {
  const { data: charger, isLoading, error } = useCharger(id);
  return (
    <Container>
      {isLoading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      {charger && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Link
            href="/"
            style={{ textDecoration: "none", width: "fit-content" }}
          >
            <MuiLink component="div" variant="subtitle2" underline="hover">
              <Box display="flex" justifyContent="baseline" alignItems="center">
                <ArrowLeft /> Back
              </Box>
            </MuiLink>
          </Link>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="start"
            gap={2}
          >
            <InfoGrid charger={charger} />
            <BookingForm charger={charger} />
          </Box>
        </Box>
      )}
    </Container>
  );
}
